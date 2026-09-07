//#32202 SP:: 2018/02/09:: Esta es la lógica que hace que cuando se clickea en "Ver productos asociados", en el tab de "iB2C Mercado Libre" cargue las tiendas virtuales al combobox
//#32202 SP:: 2018/02/09:: Modifico los selectores de JavaScript puro, por los de la librería de JQuery (mantenimiento)
//#32202 SP:: 2018/02/09:: Agrego las variables necesarias para aplicar los filtros del tab "iB2C Mercado Libre"
//#32202 SP:: 2018/02/14:: Agrego los filtros de búsqueda del tab "iB2C - Mercado Libre"

$(document).ready(function () {
  if (doAction == 1) getProductsList();

  validateUndefinded();
  //Menú de acciones disponibles
  $(".accDisp_sin_navegacion")
    .bind("click", function () {
      $(".accDisp_sin_navegacion").toggleClass("ADopen");
      if ($(".accDisp_sin_navegacion").hasClass("ADopen")) {
        $("#footAD").show();
        $("#menuAD").slideDown(100);
      } else {
        $("#footAD").hide();
        $("#menuAD").slideUp(10, function () {
          $(".accDisp_sin_navegacion").removeClass("ADopen");
        });
      }
    })
    .bind("mouseleave", function () {
      setTimeout(function () {
        if ($(".accDisp_sin_navegacion").hasClass("ADopen")) {
          $("#footAD").hide();
          $("#menuAD").slideUp(70, function () {
            $(".accDisp_sin_navegacion").removeClass("ADopen");
          });
        }
      }, 400);
    });

  $("#advSearchButton").click(function () {
    if ($("#doAdvancedSearch").val() == 0) {
      $("#tbl_advancedSearch").show();
      $("#advancedSearch").slideToggle("fast");
      $("#doAdvancedSearch").val(1);
    } else {
      $("#advancedSearch").slideToggle("fast", function () {
        $("#tbl_advancedSearch").show();
      });
      $("#doAdvancedSearch").val(0);
    }
    if ($("#advSearchButton .downArrow").hasClass("up")) {
      $("#advSearchButton .downArrow").removeClass("up");
    } else {
      $("#advSearchButton .downArrow").addClass("up");
    }
  });

  $("#productDesc").autocomplete("ws/productDefault.asp", {
    width: 300,
    scroll: true,
    scrollHeight: 220,
    mustMatch: false,
    minChars: 2,
    paramSelectors: {
      providerID: "#providerID",
      trademarkID: "#trademarkID",
      seasonID: "#seasonID",
      searchType: "[name=searchType]:checked",
      productTypeID: "#productTypeID",
      productCategoryID: "#productCategoryID",
      materialID: "#materialID",
      lineID: "#lineID",
      displayOnlyStock: "#displayOnlyStock",
      displayOnlyB2C: "#displayOnlyB2C",
    },
    extraParams: { func: "autosuggestOptions" },
    formatItem:
      "[{productDesc}] {descriptionWOCode}<br />{productTypeDesc}&nbsp;({productCategoryDesc})&nbsp;{materialName}<br/>{seasonName}&nbsp;-&nbsp;{lineName}",
    onItemSelect: function (li) {
      if (li && li.elementData) {
        $("#productDesc").val(li.elementData.description);
        loadAfterClick($("#btnSearch")[0], 1, "Buscando...");
        window.location =
          "details.asp?masterProductUID=" + li.elementData.masterProductUID;
        return false;
      } else return false;
    },
  });

  //MP::16/03/2015:: Cuando se selecciona el combo "Ver solo productos de B2C aparece el combo de tiendas virtuales
  $("#displayOnlyB2C").click(function () {
    var displayOnlyB2C = $("#displayOnlyB2C");
    // Actualizo el combo de categorías
    if (displayOnlyB2C.val() == 1) {
      $.post(
        "ws/productDefault.asp",
        {
          func: "getB2CStoresCombo",
        },
        function (data) {
          if (data) {
            $("#td_B2CStoreIDCmb span").html(data);
            $("#storeID").prepend(
              "<option value='0' selected='selected' > [Seleccione] </option>",
            );
            $("#td_B2CStoreIDCmb #storeID")
              .attr("id", "B2CStoreIDToFilter")
              .attr("name", "B2CStoreIDToFilter");
          }
        },
      );
      $("[name=displayOnlyB2CFilters1]").show();
    } else {
      $("#td_B2CStoreIDCmb span").html(
        '<i>Seleccione "Ver s&oacute;lo productos publicados en iB2C"</i>',
      );
      $("[name=displayOnlyB2CFilters1]").hide();
    }
  });

  //MNL: 05/03/2020: Cambio la forma en la que se muestra el filtro de productos asociados a MeLi - #44286 - iPN - Error en Exportación de productos a XLS
  $("#displayProductsAssociates").change(function () {
    if ($(this).val() == 1 || $(this).val() == 2) {
      $("#displayProductsAssociates").attr(
        "displayOnlyB2CMLAItems",
        $(this).val(),
      );
      $("#displayStoreFilter").show();

      if ($(this).val() == 1) {
        $("#statusPublication").show();
        $("#statusFilterActived").show();
        $("#statusFilterPending").show();
        $("#statusFilterNoActivated").show();
        $("#statusFilterPaused").show();
        $("#statusFilterProgramming").show();
        $("#statusFinished").show();
        $("#statusNotPublished").show();
      } else {
        $("#statusPublication").hide();
        $("#statusFilterActived").hide();
        $("#statusFilterPending").hide();
        $("#statusFilterNoActivated").hide();
        $("#statusFilterPaused").hide();
        $("#statusFilterProgramming").hide();
        $("#statusFinished").hide();
        $("#statusNotPublished").hide();
      }

      $.post(
        "ws/productDefault.asp",
        {
          func: "getB2CStoresCombo",
        },
        function (data) {
          if (data) {
            $("#td_B2CVirtualStoreIDCmb span").html(data);
            $("#td_B2CVirtualStoreIDCmb #storeID")
              .attr("id", "virtualStoreID")
              .attr("name", "virtualStoreID");
            $("#virtualStoreID").prepend(
              "<option value='0' selected='selected' > [Seleccione] </option>",
            );
          }
        },
      );
    } else {
      $("#td_B2CVirtualStoreIDCmb span").html(
        '<i>Seleccione "Publicado en MeLi" o "Sin publicar en MeLi"</i>',
      );
      $("#displayProductsAssociates").attr("displayOnlyB2CMLAItems", 0);
      $("#displayStoreFilter").hide();
      $("#statusPublication").hide();
      $("#statusFilterActived").hide();
      $("#statusFilterPending").hide();
      $("#statusFilterNoActivated").hide();
      $("#statusFilterPaused").hide();
      $("#statusFilterProgramming").hide();
      $("#statusFinished").hide();
      $("#statusNotPublished").hide();
    }
  });

  $("#displayOnlyB2B").click(function () {
    var displayOnlyB2B = $("#displayOnlyB2B");
    // Actualizo el combo de categorías
    if (displayOnlyB2B.val() == 1) {
      $.post(
        "ws/productDefault.asp",
        {
          func: "getB2BStoresCombo",
        },
        function (data) {
          if (data) {
            $("#td_B2BStoreIDCmb span").html(data);
            $("#B2BstoreIDToFilter").prepend(
              "<option value='0' selected='selected' > [Seleccione] </option>",
            );
          }
        },
      );
    } else
      $("#td_B2BStoreIDCmb span").html(
        '<i>Seleccione "Ver s&oacute;lo productos publicados en iB2B"</i>',
      );
  });

  //NP: 2025-06-11: Habilito el filtro por tienda virtual para la opción "Sin publicar en TDN"  #72810 - iL Core: Filtro de publicaciones de ML en buscador de productos
  $("#displayOnlyTDN").change(function () {
    if ($("#displayOnlyTDN").val() == 1 || $("#displayOnlyTDN").val() == 2) {
      $("#TDNstoreIDToFilter").removeAttr("style");
      $("#td_TDNStoreIDCmb span").html("");
    } else {
      $("#TDNstoreIDToFilter").attr("style", "display:none");
      $("#td_TDNStoreIDCmb span").html(
        '<i>Seleccione "Publicado en TDN" o "Sin publicar en TDN"</i>',
      );
    }
  });

  $("[name=statusNotPublished]").click(function () {
    if ($(this).is(":checked")) {
      $("[name=statusFilterAll]")
        .attr("disabled", "disabled")
        .attr("checked", false);
      $("[name=statusFilterActived]")
        .attr("disabled", "disabled")
        .attr("checked", false);
      $("[name=statusFilterPending]")
        .attr("disabled", "disabled")
        .attr("checked", false);
      $("[name=statusFilterNoActivated]")
        .attr("disabled", "disabled")
        .attr("checked", false);
      $("[name=statusFilterPaused]")
        .attr("disabled", "disabled")
        .attr("checked", false);
      $("[name=statusFilterProgramming]")
        .attr("disabled", "disabled")
        .attr("checked", false);
      $("[name=statusFinished]")
        .attr("disabled", "disabled")
        .attr("checked", false);
    } else {
      $("[name=statusFilterAll]").attr("disabled", false);
      $("[name=statusFilterActived]").attr("disabled", false);
      $("[name=statusFilterPending]").attr("disabled", false);
      $("[name=statusFilterNoActivated]").attr("disabled", false);
      $("[name=statusFilterPaused]").attr("disabled", false);
      $("[name=statusFilterProgramming]").attr("disabled", false);
      $("[name=statusFinished]").attr("disabled", false);
    }
  });

  $("#masterPIDToFilter").blur(function () {
    if (isNaN($(this).val())) $(this).val("");
  });
});

function productDescKeyUp(evt) {
  try {
    var keynum, keychar, numcheck;
    if (window.event) {
      // IE
      keynum = evt.keyCode;
    } else if (evt.which) {
      // Netscape/Firefox/Opera
      keynum = evt.which;
    }

    if (keynum == 13) {
      doSearch();
    }

    return true;
  } catch (e) {}
}

function validateUndefinded() {
  if (_productDesc === undefined || _productDesc == null) {
    _productDesc = "0";
  }
  if (_seasonID === undefined || isNaN(_seasonID) || _seasonID == null) {
    _seasonID = "0";
  }
  if (_providerID === undefined || isNaN(_providerID) || _providerID == null) {
    _providerID = "0";
  }
  if (
    _productCategoryID === undefined ||
    isNaN(_productCategoryID) ||
    _productCategoryID == null
  ) {
    _productCategoryID = "0";
  }
  if (
    _trademarkID === undefined ||
    isNaN(_trademarkID) ||
    _trademarkID == null
  ) {
    _trademarkID = "0";
  }
  if (
    _productTypeID === undefined ||
    isNaN(_productTypeID) ||
    _productTypeID == null
  ) {
    _productTypeID = "0";
  }
  if (_materialID === undefined || isNaN(_materialID) || _materialID == null) {
    _materialID = "0";
  }
  if (_lineID === undefined || isNaN(_lineID) || _lineID == null) {
    _lineID = "0";
  }
}

function doSearch() {
  // ensure export button remains available as soon as a search is triggered
  $("#td_XLSReport").show();

  _productDesc = $("#productDesc").val();
  _seasonID = $("#seasonID").val();
  _providerID = $("#providerID").val();
  _trademarkID = $("#trademarkID").val();
  _storeIDToFilter = $("#storeID").val();
  _B2CstoreIDToFilter = $("#B2CStoreIDToFilter").val();
  _B2BstoreIDToFilter = $("#B2BstoreIDToFilter").val();
  _displayOnlyTDN = $("#displayOnlyTDN").val();
  _TDNstoreIDToFilter = $("#TDNstoreIDToFilter").val();

  //ML 18/06/2015 :: Oculto el msj de info y muestro las tablas al momento de realizar la busqueda.
  $("#msjInfo").hide();
  $("#msjTable, #msjTable, #itemsTable, #pagingTable").show();

  if ($("#productCategoryID").length) {
    _productCategoryID = $("#productCategoryID").val();
  } else {
    _productCategoryID = "0";
  }

  //MP 06/11/2017 : Agrego filtros
  _productTypeID = $("#productTypeID").val();
  _materialID = $("#materialID").val();
  _lineID = $("#lineID").val();

  _searchType = $("[name='searchType']:checked").val();

  if (
    $("#displayOnlyStock")[0] != undefined &&
    $("#displayOnlyStock").is(":checked")
  ) {
    _displayOnlyStock = "1";
  } else {
    _displayOnlyStock = "0";
  }

  if (
    $("#displayOnlyImported")[0] != undefined &&
    $("#displayOnlyImported").is(":checked")
  ) {
    _displayOnlyImported = "1";
  } else {
    _displayOnlyImported = "0";
  }

  if ($("#displayOnlyB2B")[0] != undefined && $("#displayOnlyB2B").val() > 0) {
    //&& $('#displayOnlyB2C').is(":checked")) {
    if ($("#displayOnlyB2B").val() == 1) _displayOnlyB2B = "1";
    else _displayOnlyB2B = "2";
  } else _displayOnlyB2B = "0";

  if ($("#displayOnlyB2C")[0] != undefined && $("#displayOnlyB2C").val() > 0) {
    if ($("#displayOnlyB2C").val() == 1) _displayOnlyB2C = "1";
    else _displayOnlyB2C = "2";
  } else _displayOnlyB2C = "0";

  _isFeaturedProduct = $("#isFeaturedProduct option:selected").val();
  _displayInHomePage = $("#displayInHomePage option:selected").val();
  _isVisible = $("#isVisible option:selected").val();
  _isCatalogVisible = $("#isCatalogVisible option:selected").val();
  _hasVisiblePrice = $("#hasVisiblePrice option:selected").val();
  _disableBuyButton = $("#disableBuyButton option:selected").val();
  _IsFreeShipping = $("#IsFreeShipping option:selected").val();
  _hasReturn = $("#hasReturn option:selected").val();

  _markAsNew = $("#markAsNew option:selected").val();
  _MarkAsNewFrom = $("#MarkAsNewFrom").val();
  _MarkAsNewTo = $("#MarkAsNewTo").val();

  _promotionType = $("#promotionType option:selected").val();
  _isInSaleFromDate = $("#isInSaleFromDate").val();
  _isInSaleToDate = $("#isInSaleToDate").val();

  _hideProductSizes = $("#hideProductSizes").val();
  _hideProductColors = $("#hideProductColors").val();

  //TD:20018-04-11: Agrego masterPIDToFilter
  _masterPIDToFilter = $("#masterPIDToFilter").val();

  _storeIDToFilterStr = "";
  $("[name='storeIDToFilterStr']:checked")
    .each(function (index) {
      _storeIDToFilterStr =
        _storeIDToFilterStr == ""
          ? this.value
          : _storeIDToFilterStr + ", " + this.value;
    })
    .get();

  //alert(_masterPIDToFilter);

  //#32202 SP:: 2018/02/09:: Agrego las variables necesarias para aplicar los filtros del tab "iB2C Mercado Libre"
  //Lo mismo voy a tener que hacer para las exportaciones a excel, pero lo dejo para el final, ya que hay que buscar las dependecias...

  //MNL: 05/03/2020: Cambio lógica del if del filtro de MeLi - #44286 - iPN - Error en Exportación de productos a XLS

  if (
    $("#displayProductsAssociates").val() == 1 ||
    $("#displayProductsAssociates").val() == 2
  ) {
    _displayOnlyB2CMLAItems = $("#displayProductsAssociates").val();
    _virtualStoreID = $("#virtualStoreID option:selected").val();
    _statusFilter = "";

    // 'active, pending, not_yet_active, paused, programmed, closed'

    if ($("input[name=statusFilterActived]").is(":checked")) {
      if (_statusFilter == "") _statusFilter += "active";
    }

    if ($("input[name=statusFilterPending]").is(":checked")) {
      if (_statusFilter == "") _statusFilter += "pending";
      else _statusFilter += ",pending";
    }

    if ($("input[name=statusFilterNoActivated]").is(":checked")) {
      if (_statusFilter == "") _statusFilter += "not_yet_active";
      else _statusFilter += ",not_yet_active";
    }

    if ($("input[name=statusFilterPaused]").is(":checked")) {
      if (_statusFilter == "") _statusFilter += "paused";
      else _statusFilter += ",paused";
    }

    if ($("input[name=statusFilterProgramming]").is(":checked")) {
      if (_statusFilter == "") _statusFilter += "programmed";
      else _statusFilter += ",programmed";
    }

    if ($("input[name=statusFinished]").is(":checked")) {
      if (_statusFilter == "") _statusFilter += "closed";
      else _statusFilter += ",closed";
    }

    if ($("#displayProductsAssociates").val() == 2) {
      _statusFilter = "";
    }
  } else if ($("#displayProductsAssociates").val() == 0) {
    _displayOnlyB2CMLAItems = 0;
    _virtualStoreID = "";
    _statusFilter = "";
  }

  validateUndefinded();

  loadAfterClick($("#btnSearch")[0], 1, "Buscando...");
  _PageIndex = 1;
  getProductsList();
}

function doSort(orderFieldSelected) {
  _orderField = orderFieldSelected;

  if (
    $("[orderField=" + _orderField + "]").attr("sortDirection") == "" ||
    $("[orderField=" + _orderField + "]").attr("sortDirection") == "DESC"
  ) {
    _sortDirection = "ASC";
  } else {
    _sortDirection = "DESC";
  }

  _PageIndex = 1;
  getProductsList();
}

function changePage(evt) {
  try {
    var keynum, keychar, numcheck;
    if (window.event) {
      // IE
      keynum = evt.keyCode;
    } else if (evt.which) {
      // Netscape/Firefox/Opera
      keynum = evt.which;
    }

    if (
      (keynum == 13 || keynum == 9) &&
      document.getElementById("pageNumber").value != 0
    ) {
      _PageIndex = document.getElementById("pageNumber").value;
      getProductsList();
      return true;
    }

    //Línea aportada por SC
    keynum = keynum > 95 && keynum < 106 ? keynum - 48 : keynum;

    keychar = String.fromCharCode(keynum);
    numcheck = /[\b]|\d{1,5}/;
    return numcheck.test(keychar);
  } catch (e) {}
}

function showBarcodeSearch() {
  window.location = "barCodeSearch.asp";
}

function openProduct(masterProductUID) {
  window.location.href = "details.asp?masterProductUID=" + masterProductUID;
}

// ******************************************************************************************************
// Funcion utilizada para buscar los productos con los filtros seleccionados
// ******************************************************************************************************
function getProductsList() {
  $("#spn_Log").html(
    "<img src='../../system/images/icons/16/icon_0037.png' />&nbsp;Cargando lista...<br /><br /><br />",
  );
  $("[name=ItemTR]").remove();
  $("#pagingTable").hide();
  $.post(
    "ws/productDefault.asp",
    {
      func: "productsList",
      providerID: _providerID,
      productTypeID: _productTypeID,
      productDesc: _productDesc,
      searchType: _searchType,
      seasonID: _seasonID,
      materialID: _materialID,
      displayOnlyStock: _displayOnlyStock,
      displayOnlyImported: _displayOnlyImported,
      displayOnlyB2B: _displayOnlyB2B,
      displayOnlyB2C: _displayOnlyB2C,
      PageIndex: _PageIndex,
      PageSize: _PageSize,
      orderField: _orderField,
      sortDirection: _sortDirection,
      productCategoryID: _productCategoryID,
      trademarkID: _trademarkID,
      lineID: _lineID,
      storeIDForExpo: 0,
      B2BstoreIDToFilter: _B2BstoreIDToFilter,
      isFeaturedProduct: _isFeaturedProduct,
      displayInHomePage: _displayInHomePage,
      isVisible: _isVisible,
      isCatalogVisible: _isCatalogVisible,
      hasVisiblePrice: _hasVisiblePrice,
      disableBuyButton: _disableBuyButton,
      IsFreeShipping: _IsFreeShipping,
      hasReturn: _hasReturn,
      markAsNew: _markAsNew,
      MarkAsNewFrom: _MarkAsNewFrom,
      MarkAsNewTo: _MarkAsNewTo,
      promotionType: _promotionType,
      isInSaleFromDate: _isInSaleFromDate,
      isInSaleToDate: _isInSaleToDate,
      hideProductColors: _hideProductColors,
      hideProductSizes: _hideProductSizes,
      //#32202 SP:: 2018/02/14:: Agrego los filtros de búsqueda del tab "iB2C - Mercado Libre"
      displayOnlyB2CMLAItems: _displayOnlyB2CMLAItems,
      virtualStoreID: _virtualStoreID,
      statusFilter: _statusFilter,
      statusNotPublished: _statusNotPublished,
      //TD:2018-04-11: Agrego masterPIDToFilter
      masterPIDToFilter: _masterPIDToFilter,
      B2CstoreIDToFilter: _B2CstoreIDToFilter,
      storeIDToFilterStr: _storeIDToFilterStr,
      displayOnlyTDN: _displayOnlyTDN,
      TDNstoreIDToFilter: _TDNstoreIDToFilter,
    },
    function (text) {
      if (text != "") {
        $("#itemsTable").html(text);

        var _totalPagesQty = parseInt($("#headerRow").attr("totalPagesQty"));
        var _totalRecordsQty = parseInt(
          $("#headerRow").attr("totalRecordsQty"),
        );
        var _totalUnitQty = parseInt($("#headerRow").attr("totalUnitQty"));

        var XLSFilters =
          "searchType=" +
          _searchType +
          "&productDesc=" +
          _productDesc +
          "&seasonID=" +
          _seasonID +
          "&providerID=" +
          _providerID +
          "&materialID=" +
          _materialID +
          "&productTypeID=" +
          _productTypeID +
          "&orderField=" +
          _orderField +
          "&sortDirection=" +
          _sortDirection +
          "&displayOnlyStock=" +
          _displayOnlyStock +
          "&displayOnlyImported=" +
          _displayOnlyImported +
          "&displayOnlyB2B=" +
          _displayOnlyB2B +
          "&displayOnlyB2C=" +
          _displayOnlyB2C +
          "&statusFilter=" +
          _statusFilter +
          "&statusNotPublished=" +
          _statusNotPublished;

        $("#a_XLSReport").attr("href", "productsReportXLS.asp?" + XLSFilters);
        $("#td_XLSReport").show();
        $("#tableNoRecords").hide();
        $("#itemsTable").show();
        $("#pagingTable").show();

        $("[orderField=" + _orderField + "]").attr(
          "sortDirection",
          _sortDirection,
        );
        $("th[orderField][orderField!=" + _orderField + "]").attr(
          "sortDirection",
          "",
        );

        for (i = 1; i <= 9; i++) {
          if (i == _orderField) {
            if (_sortDirection == "ASC") {
              $("#img_sort_" + i).attr(
                "src",
                _sSystemPath + "/images/misc/flechasUp_activa.png",
              );
            } else {
              $("#img_sort_" + i).attr(
                "src",
                _sSystemPath + "/images/misc/flechasDown_activa.png",
              );
            }
          } else {
            $("#img_sort_" + i).attr(
              "src",
              _sSystemPath + "/images/misc/flechas_inactiva.png",
            );
          }
        }

        var lastRegisterNumber;
        var firstRegisterNumber;

        firstRegisterNumber = (_PageIndex - 1) * _PageSize + 1;

        if (_PageIndex * _PageSize > _totalRecordsQty) {
          lastRegisterNumber = _totalRecordsQty;
        } else {
          lastRegisterNumber = _PageIndex * _PageSize;
        }

        $("#td_registersQty").html(
          "Registros <b>" +
            String(firstRegisterNumber) +
            "</b> - <b>" +
            String(lastRegisterNumber) +
            " de " +
            String(_totalRecordsQty),
        );

        var pagesHTML = "";

        if (_PageIndex > 1) {
          pagesHTML =
            pagesHTML +
            '<img style="padding-top:5px" src="' +
            _sSystemPath +
            '/images/icons/16/icon_0004.png" class="cursor" onclick="javascript:_PageIndex=1;getProductsList();" /> ';
          pagesHTML =
            pagesHTML +
            '<img style="padding-top:5px" src="' +
            _sSystemPath +
            '/images/icons/16/icon_0005.png" class="cursor" onclick="javascript:_PageIndex=parseInt(_PageIndex)-1;getProductsList();" /> ';
        }

        pagesHTML =
          pagesHTML +
          '<span style="padding: 6px 2px 2px 2px !important;"> P&aacute;gina <b class="inputChicoChico" id="pageNumber" style="text-align:center;">' +
          _PageIndex +
          "</b> de <b>" +
          String(_totalPagesQty) +
          "</b></span>";

        if (_PageIndex < _totalPagesQty) {
          pagesHTML =
            pagesHTML +
            ' <img style="padding-top:5px" src="' +
            _sSystemPath +
            '/images/icons/16/icon_0006.png" class="cursor" onclick="javascript:_PageIndex=parseInt(_PageIndex)+1;getProductsList();" />';
          pagesHTML =
            pagesHTML +
            ' <img style="padding-top:5px" src="' +
            _sSystemPath +
            '/images/icons/16/icon_0007.png" class="cursor" onclick="javascript:_PageIndex=' +
            String(_totalPagesQty) +
            ';getProductsList();" />';
        }

        //CA::2018-09-17:: Agrego exportType5 (Exportación de importación de ajuste/reposición), solo la mostramos cuando estemos filtrando por tipo de producto.
        if (_productTypeID != 0) {
          $("#chkExportType5, #chkExportTypeTask5").removeAttr("disabled");
          $("#exportType5Qtip").hide();
        } else {
          $("#chkExportType5, #chkExportTypeTask5").attr(
            "disabled",
            "disabled",
          );
          $("#exportType5Qtip").show();
        }

        $("#td_pagesQty").html("<div>" + pagesHTML + "</div>");

        $(document).ready(function () {
          // FP - 14/04/2023: Saco de acá la lógica del magnificPopup para meterla en otra función | #60584 - ERROR IMAGEN
          //$("a.openImagePopup").click(e => {e.preventDefault});
        });

        //Código utilizado por el colorBox
        $(".pricePopup").colorbox({
          width: "600px",
          height: "100px",
          iframe: true,
          scrolling: false,
          fastIframe: false,
        });
      } else {
        $("#td_XLSReport").hide();
        $("#tableNoRecords").show();
        $("#itemsTable").hide();
        $("#pagingTable").hide();
        //CA::2018-09-17:: Agrego exportType5 (Exportación de importación de ajuste/reposición), si no encuentra resultados la vuelve a ocultar.
        $("#exportType5").hide();
      }
      $("#spn_Log").html("");
      $("#btnSearch")
        .attr("class", "btnAzul")
        .val("Buscar")
        .off("click")
        .on("click", function () {
          doSearch();
        });
    },
  );
}

// FP - 13/04/2023: Creo una función para inicializar los popups con la nueva lógica | #60584 - ERROR IMAGEN
function initMagnificPopupWithWS(masterPID) {
  // isGalleryLoaded guarda si ya cargué la galería, así me aseguro de hacerlo una única vez
  if ($("[masterPID=" + masterPID + "]").attr("isGalleryLoaded") == 0) {
    // El ajax va contra un WS que trae las URLs de las imágenes
    $.ajax({
      type: "POST",
      url: "ws/ws.asp",
      data: {
        doAction: "4",
        masterPID: masterPID,
      },
      success: function (data) {
        data = JSON.parse(data);
        $("#imagePopup_" + masterPID).attr("href", data[0]);
        data.forEach((elem, i) => {
          if (i != 0) {
            // Agrego los <a> que necesita magnificPopup para crear la galería
            newElem = `<a hidden href="${elem}"></a>`;
            $("[masterPID=" + masterPID + "]").append(newElem);
          }
        });
        // Inicio el magnificPopup
        $("[masterPID=" + masterPID + "]").magnificPopup({
          type: "image",
          delegate: "a",
          tLoading: "Cargando imagen...",
          src: "#imagePopup",
          gallery: {
            enabled: true,
            navigateByImgClick: true,
          },
          image: {
            tError: "La imagen no pudo ser cargada.",
            cursor: null,
          },
        });
        $("[masterPID=" + masterPID + "]").attr("isGalleryLoaded", "1");
        $("#imagePopup_" + masterPID).click();
        $("[masterPID=" + masterPID + "]").attr("onclick", "");
      },
    });
  }
}

// Modifica la distribución de talles y recarga el combo de categorías en base al tipo de artículo seleccionado
function changeProductType() {
  var productTypeID = $("#productTypeID").val();

  // Actualizo el combo de categorías
  $.post(
    "ws/productAdd.asp",
    {
      func: "getCategoriesCombo",
      productTypeID: productTypeID,
    },
    function (data) {
      if (data) {
        $("#productCategoryID").attr("disabled", "disabled"); //mato hidden
        $("#td_productCategoryCmb span").html(data);
        $("#productCategoryID").css("width", "100px").removeAttr("onchange");

        setTimeout(function () {
          //Agrego flexselect
          if ($("#productCategoryID").next(".flexselect_input").length) {
            $("#productCategoryID").next(".flexselect_input").remove();
            $("#productCategoryID").show();
          }
          $("#productCategoryID")
            .addClass("flexselect")
            .flexselect({ allowMismatch: false });
        }, 10);

        //ST - 2018-01-30: Agrego if.
        if ($("#productCategoryID").val() == undefined) {
          $("#td_productCategoryCmb span").attr("width", "300");
          $("#td_productCategoryCmb span").html(
            "<span style='width:300px;text-align: left;'><i>Seleccione un tipo de producto que posea categor&iacute;as</i></span>",
          );
        }
      } else {
        $("#productCategoryID").removeAttr("disabled"); //activo hidden
        $("#td_productCategoryCmb span").html("<i>Seleccione una familia</i>");
      }
    },
  );
}
