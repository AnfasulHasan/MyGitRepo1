sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("newcapmapp1.controller.View1", {
            onInit: function () {
                this._oTable = this.byId("idTable");
            },
            navTo: function(oEvent){
                var oItem = oEvent.getSource();
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteView2", {
                    campApp: window.encodeURIComponent(oItem.getBindingContext("odata").getPath().substr(1))
                });
            },
            onOpenAddDialog: function () {
                this.getView().byId("OpenDialog").open();
            },
            onCancelDialog: function (oEvent) {
                oEvent.getSource().getParent().close();
            },
            onCreate: function () {
                var oId = this.getView().byId("idId").getValue();
                var oId2 = parseInt(oId);

                if (oId2 !== "") {
                    const oList = this._oTable;
                    const oBinding = oList.getBinding("items");
                    const oContext = oBinding.create({
                        "ID" : oId2,
                        "Name": this.byId("idName").getValue(),
                        "Profile": this.byId("idProfile").getValue(),
                        "UnitPrice": this.byId("idUnitPrice").getValue()                         
                    });
                    this.getView().byId("OpenDialog").close();
                    this.getOwnerComponent().getModel("odata").submitBatch()
                    .then(()=>{
                        this.getView().byId("OpenDialog").close();
                        // oContext.created()
                        // that._focusItem(oList, oContext);
                    });  
                    MessageToast.show("Record SuccessFully Created .");
                }
                else {
                    MessageToast.show("Record cannot be blank !!");
                }
            }, 
            onEditMode: function(){
                this.byId("editModeButton").setVisible(true);
                this.byId("deleteButton").setVisible(true);
                // this.rebindTable(this.oEditableTemplate, "Edit");
           },
           onDelete: function(){

            var oSelected = this.byId("idTable").getSelectedItem();
            if(oSelected){
                var oSalesOrder = oSelected.getBindingContext("odata").getObject().ID;
            
                oSelected.getBindingContext("odata").delete().then(function () {
                    MessageToast.show(oSalesOrder + " SuccessFully Deleted");
                }.bind(this), function (oError) {
                    MessageToast.show("Deletion Error: ",oError);
                });
            } else {
                MessageToast.show("Please Select a Row to Delete");
            }            
            },          
        });
    });
