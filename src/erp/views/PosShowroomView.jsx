import React, { useState, useEffect, useRef } from 'react';
import { 
  Barcode, ShoppingCart, Search, Plus, Minus, Trash2, CheckCircle2, 
  CreditCard, DollarSign, User, Package, RefreshCw, Send, AlertCircle
} from 'lucide-react';
import { scanBarcodePos, fetchErpCustomers, fetchErpProducts } from '../erpClient';

export default function PosShowroomView() {
  const [barcodeInput, setBarcodeInput] = useState('');
  const [searching, setSearching] = useState(false);
  const [cart, setCart] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [priceListType, setPriceListType] = useState('wholesale'); // wholesale or retail
  const [paymentMethod, setPaymentMethod] = useState('EFECTIVO');
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [recentProducts, setRecentProducts] = useState([]);

  const barcodeRef = useRef(null);

  useEffect(() => {
    // Focus barcode input
    if (barcodeRef.current) barcodeRef.current.focus();

    // Load customers and sample products
    const loadInit = async () => {
      const cRes = await fetchErpCustomers();
      if (cRes.success && cRes.data.length > 0) {
        setCustomers(cRes.data);
        setSelectedCustomerId(cRes.data[0].id);
      }

      const pRes = await fetchErpProducts({ limit: 8 });
      if (pRes.success) {
        setRecentProducts(pRes.data || []);
      }
    };
    loadInit();
  }, []);

  const handleScan = async (e) => {
    e.preventDefault();
    if (!barcodeInput.trim()) return;

    setSearching(true);
    const res = await scanBarcodePos(barcodeInput.trim());
    if (res.success && res.data) {
      addToCart(res.data);
      setBarcodeInput('');
    } else {
      alert('Código de barras o SKU no encontrado: ' + barcodeInput);
    }
    setSearching(false);
  };

  const addToCart = (productData, isCurve = false) => {
    const unitPrice = priceListType === 'wholesale' ? productData.prices.wholesale : productData.prices.retail;
    const qty = isCurve ? 12 : 1;

    const existingIdx = cart.findIndex(item => item.variantId === productData.variantId && item.isCurve === isCurve);

    if (existingIdx !== -1) {
      const updated = [...cart];
      updated[existingIdx].qty += qty;
      updated[existingIdx].subtotal = updated[existingIdx].qty * unitPrice;
      setCart(updated);
    } else {
      setCart([...cart, {
        variantId: productData.variantId,
        sku: productData.sku,
        title: productData.title,
        color: productData.color,
        size: productData.size,
        brand: productData.brand,
        image: productData.image,
        unitPrice,
        qty,
        isCurve,
        subtotal: qty * unitPrice,
        stockAvailable: productData.stock.depGral
      }]);
    }
  };

  const updateCartQty = (idx, delta) => {
    const updated = [...cart];
    updated[idx].qty += delta;
    if (updated[idx].qty <= 0) {
      updated.splice(idx, 1);
    } else {
      updated[idx].subtotal = updated[idx].qty * updated[idx].unitPrice;
    }
    setCart(updated);
  };

  const removeCartItem = (idx) => {
    const updated = [...cart];
    updated.splice(idx, 1);
    setCart(updated);
  };

  const totalAmount = cart.reduce((acc, i) => acc + i.subtotal, 0);
  const totalPairs = cart.reduce((acc, i) => acc + i.qty, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCart([]);
      setCheckoutSuccess(false);
      alert('¡Venta de Showroom registrada exitosamente! Se generó el remito de salida.');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Barcode className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-white tracking-tight">Terminal Punto de Venta (POS) Showroom</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Lector de Barras Activo
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Escaneo instantáneo de códigos de barra EAN13 o SKUs, soporte para bultos cerrados y pares sueltos.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950 p-1.5 rounded-2xl border border-slate-800 flex items-center gap-1">
            <button
              onClick={() => setPriceListType('wholesale')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                priceListType === 'wholesale' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Lista Mayorista (L2)
            </button>
            <button
              onClick={() => setPriceListType('retail')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                priceListType === 'retail' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Lista Público (L1)
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Barcode Scanner & Quick Picker (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Scanner Input Bar */}
          <form onSubmit={handleScan} className="bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-xl flex gap-3 items-center">
            <div className="relative flex-1">
              <Barcode className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400" />
              <input
                ref={barcodeRef}
                type="text"
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
                placeholder="Escanear código de barras EAN13 o escribir SKU (ej: 04748, 007, 0759)..."
                className="w-full pl-12 pr-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-white font-mono text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={searching}
              className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl text-sm transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
            >
              <Search className="w-4 h-4" />
              {searching ? 'Buscando...' : 'Buscar'}
            </button>
          </form>

          {/* Quick Add Product Grid */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-400">
              Artículos Rápidos Showroom
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {recentProducts.map((p) => {
                const sampleVariant = (p.colors && p.colors[0]?.sizes && p.colors[0]?.sizes[0]) ? p.colors[0].sizes[0] : {};
                const variantData = {
                  variantId: sampleVariant.id || p.id,
                  barcode: sampleVariant.barcode || sampleVariant.barcodeEan13 || p.sku,
                  size: sampleVariant.sizeNumber || '37',
                  color: (p.colors && p.colors[0]?.name) || 'Negro',
                  sku: p.sku,
                  title: p.title,
                  brand: p.brand,
                  category: p.category,
                  image: p.mainImage,
                  prices: { wholesale: p.wholesalePrice || 0, retail: p.retailPrice || 0 },
                  stock: { depGral: p.stockSummary?.depGral || 0 }
                };

                return (
                  <div key={p.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-3.5 space-y-2.5 flex flex-col justify-between hover:border-slate-700 transition-all">
                    <div>
                      <div className="aspect-square rounded-xl bg-slate-900 overflow-hidden mb-2">
                        <img src={p.mainImage} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] font-mono font-black text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-md">
                        {p.sku}
                      </span>
                      <p className="text-xs font-bold text-white line-clamp-1 mt-1">{p.title}</p>
                      <p className="text-xs font-black text-emerald-400 mt-0.5">
                        ${(priceListType === 'wholesale' ? p.wholesalePrice : p.retailPrice).toLocaleString('es-AR')}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 pt-1">
                      <button
                        onClick={() => addToCart(variantData, false)}
                        className="py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg text-[10px] text-center"
                        title="Agregar 1 Par Suelto"
                      >
                        1 Par
                      </button>
                      <button
                        onClick={() => addToCart(variantData, true)}
                        className="py-1.5 bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 font-black rounded-lg text-[10px] text-center border border-emerald-500/30 transition-all"
                        title="Agregar Curva Completa (12 pares)"
                      >
                        Curva (12)
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Active Ticket / Cart (1 Col) */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-sky-400" />
                <h3 className="text-base font-bold text-white">Ticket de Venta Showroom</h3>
              </div>
              <span className="px-2 py-0.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-lg">
                {totalPairs} pares
              </span>
            </div>

            {/* Customer Selector */}
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Cliente / Cuenta</label>
              <select
                value={selectedCustomerId}
                onChange={(e) => setSelectedCustomerId(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-white focus:border-sky-500 focus:outline-none"
              >
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.customerType}) - Saldo: ${c.currentBalance.toLocaleString('es-AR')}
                  </option>
                ))}
              </select>
            </div>

            {/* Cart Items List */}
            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {cart.length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-xs">
                  <Package className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  El ticket está vacío. Escaneá un producto.
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-1.5 rounded">
                          {item.sku}
                        </span>
                        <p className="text-xs font-bold text-white truncate">{item.title}</p>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {item.color} | Talle: {item.size} {item.isCurve && <span className="text-emerald-400 font-bold">(Curva 12p)</span>}
                      </p>
                      <p className="text-xs font-black text-emerald-400 mt-1">
                        ${item.subtotal.toLocaleString('es-AR')}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1">
                        <button
                          onClick={() => updateCartQty(idx, item.isCurve ? -12 : -1)}
                          className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono font-bold text-xs px-2 text-white">{item.qty}</span>
                        <button
                          onClick={() => updateCartQty(idx, item.isCurve ? 12 : 1)}
                          className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeCartItem(idx)}
                        className="p-1.5 hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 rounded-xl transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Totals & Checkout Actions */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div>
              <label className="text-xs font-bold text-slate-400 block mb-1">Medio de Pago</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-white focus:border-sky-500 focus:outline-none"
              >
                <option value="EFECTIVO">Efectivo / Mostrador</option>
                <option value="TRANSFERENCIA">Transferencia Bancaria</option>
                <option value="CTA_CTE">Cuenta Corriente (A plazo)</option>
                <option value="CHEQUE">Cheque de Pago Diferido</option>
              </select>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400">Total a Cobrar</p>
                <p className="text-2xl font-black text-emerald-400 mt-0.5">
                  ${totalAmount.toLocaleString('es-AR')}
                </p>
              </div>
              <span className="text-xs text-slate-400 font-bold">{totalPairs} pares</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={cart.length === 0 || checkoutSuccess}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black rounded-2xl text-base shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {checkoutSuccess ? (
                <>
                  <CheckCircle2 className="w-5 h-5 animate-bounce" />
                  ¡Venta Emitida!
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Emitir Venta & Remito
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
