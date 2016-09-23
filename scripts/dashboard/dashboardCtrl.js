angular.module('inventoryManager')
	.controller('dashboardCtrl', ['$filter', 'DashboardServ', '$uibModal', 'ProductsData', 'AuthenServ', '$scope', 'transactionList', 'productList', function($filter, DashboardServ, $uibModal, ProductsData, AuthenServ, $scope, transactionList, productList) {
		console.log("Yeah BOOOOOOYYYYY");

		//local variables
		var vm = this;
		

		//bound function
		vm.totalCost = totalCost;
		vm.totalPrice = totalPrice;
		vm.salesNum = salesNum;
		vm.returnsNum = returnsNum;
		vm.productTransOpen = productTransOpen;
		vm.newProdOpen = newProdOpen;
		vm.newTransOpen = newTransOpen;

		vm.productTransOpen = productTransOpen;
		vm.newProdOpen = newProdOpen;
		vm.newTransOpen = newTransOpen;
		vm.subtransOpen = subtransOpen;


		vm.setProdEdit = setProdEdit;
		vm.saveProdEdit = saveProdEdit;
		vm.removeProd = removeProd;
		vm.setTransEdit = setTransEdit;
		vm.saveTransEdit = saveTransEdit;
		vm.open1 = open1;



		//bound values
		vm.productList = productList;
		vm.transactionList = transactionList;
		// vm.getDatetime = $filter('date')((new Date()), 'yyyy-mm-dd');
		vm.formats = ['yyyy-MM-dd'];
  		vm.format = vm.formats[0];
  		vm.altInputFormats = ['yyyy-MM-dd'];
		vm.sortType     = 'date'; 
  		vm.reverse  = false;  
  		vm.sortReverse = false;
  		vm.searchTrans   = '';
		vm.searchProds   = '';
		vm.editTrans = false;
		vm.editProd = false;
		vm.editProdMode = null;
		vm.editTransMode = null;
		vm.prodLimit = 5;
		vm.transLimit = 7;
		vm.popup1 = {
		   opened: false
		};
		vm.dateOptions = {
		    // dateDisabled: 'disabled',
		    formatYear: 'yyyy',
		    maxDate: new Date(),
		    minDate: new Date(1990, 5, 22),
		    startingDay: 1
		};
		vm.currentProduct = {
			amt: '',
			cost: '',
			description: '',
			id: '',
			imgThumbnail: '',
			name: '',
			price: ''
		}
		vm.currentTransaction = {
			date: '',
			id: '',
			note: '',
			totalAmt: '',
			totalCost: '',
			totalPrice: '',
			type: {
				id: '',
				description: ''
			}
		}


		//bound function implementations
		
		function goToTransDetail(id){
			$state.go("transactionDetails", {
				id: id
			});
		}

		function productTransOpen(theId){
			 var modalInstance = $uibModal.open({
		            templateUrl: 'templates/dashboard/dashModalProductTrans.html',
		            controller: "dashModalProductTransCtrl",
		            controllerAs: "dashTrans",
		            resolve: {
		            	productTrans: function(DashboardServ){
		            		return DashboardServ.getTransForProduct(theId).then(function(response) {
		            		console.log('response', response.data);
	            			return response.data;
		            		});
		            	}
		        	}

			})
			 // console.log(productTrans);
		}

		function subtransOpen(object){
			 var modalInstance = $uibModal.open({
		            templateUrl: 'templates/dashboard/subtransModal.html',
		            controller: "subtransModalCtrl",
		            controllerAs: "subtrans",
		            resolve: {
		            	specificTrans: function(DashboardServ){
		            		return DashboardServ.getSpecificTransaction(object).then(function(response) {
		            		console.log('response', response.data);
	            			return response.data;
		            		});
		            	}
		        	}

			})
			 // console.log(productTrans);
		}

		function newProdOpen(){
			 var modalInstance = $uibModal.open({
		            templateUrl: 'templates/dashboard/dashNewProdModal.html',
		            controller: "newProdModalCtrl",
		            controllerAs: "newProd"
			})
		}

		function newTransOpen(){
			 var modalInstance = $uibModal.open({
		            templateUrl: 'templates/dashboard/dashNewTransModal.html',
		            controller: "newTransModalCtrl",
		            controllerAs: "newTrans"
		      })
		}


		function totalCost(){
		    var total = 0;
		    for(var i = 0; i < transactionList.length; i++){
		        var transaction = transactionList[i];
		        total += transaction.totalCost;
		    }
		    return total;
		}
		
		function totalPrice(){
		    var total = 0;
		    for(var i = 0; i < transactionList.length; i++){
		        var transaction = transactionList[i];
		        total += transaction.totalPrice;
		    }
		    return total;
		}

		function salesNum(){
		    var total = 0;
		    for(var i = 0; i < transactionList.length; i++){
		        var transaction = transactionList[i];
		        if(transaction.type.description === "Inventory Purchase" || transaction.type.description === "Sale"){
		        	total++;
		        }
		    }
		    return total;
		}

		function returnsNum(){
		    var total = 0;
		    for(var i = 0; i < transactionList.length; i++){
		        var transaction = transactionList[i];
		        if(transaction.type.description === "Returned" || transaction.type.description === "Returned to Supplier"){
		        	total++;
		        }
		    }
		    return total;
		}

	



		function setProdEdit(product){
			vm.editProdMode = product.id;
			vm.currentProduct.amt = product.amt,
			vm.currentProduct.cost = product.cost,
			vm.currentProduct.description = product.description,
			vm.currentProduct.id = product.id,
			vm.currentProduct.imgThumbnail = product.imgThumbnail,
			vm.currentProduct.name = product.name,
			vm.currentProduct.price = product.price
		}

		function saveProdEdit(){
			ProductsData.putProduct(vm.currentProduct).then(function(response) {
				for(var i = 0; i < vm.productList.length; i++) {
					if(vm.productList[i].id === response.data.id){
						vm.productList[i] = response.data;
					}
				}
			});
			vm.editProdMode = null;

		}

		function removeProd(id) {
			ProductsData.deleteProduct(id).then(function(response) {
				for(var i = 0; i < vm.productList.length; i++) {
					if(vm.productList[i].id === Number(response.data.id)){
						vm.productList.splice(i, 1);
						console.log(vm.productList.length);
					}
				}
			});
		}

		function setTransEdit(transaction){
			vm.editTransMode = transaction.id;
			vm.currentTransaction.date = $filter('date')(transaction.date, 'yyyy-MM-dd');
			vm.currentTransaction.id = transaction.id,
			vm.currentTransaction.note = transaction.note,
			vm.currentTransaction.totalAmt = transaction.totalAmt,
			vm.currentTransaction.totalCost = transaction.totalCost,
			vm.currentTransaction.totalPrice = transaction.totalPrice,
			vm.currentTransaction.type.description = transaction.type.description,
			vm.currentTransaction.type.id = transaction.type.id,
			vm.currentTransaction.subTransactions = transaction.type.subTransactions
		}

		function saveTransEdit(){
			vm.currentTransaction.date = $filter('date')(vm.currentTransaction.date, 'yyyy-MM-dd');
			DashboardServ.putTransaction(vm.currentTransaction).then(function(response) {
				for(var i = 0; i < vm.transactionList.length; i++) {
					if(vm.transactionList[i].id === response.data.id){
						vm.transactionList[i] = response.data;
					}
				}
			});
			vm.editTransMode = null;

		}

		 function open1() {
    		vm.popup1.opened = true;
  		};

}]);


	// <div>
	// 		<p>{{ transactionNum() }}</p>
	// 		<p>{{ transaction.type.description }}</p>
	// 		<p>{{ transaction.totalAmt }}</p>
	// 		<p>{{ transaction.totalCost }}</p>
	// 		<p>{{ transaction.totalPrice }}</p>
	// 	</div>	

	// 	<!-- 1) See summary of all transaction types and store’s profits/revenue/costs:
	// 	Number of transactions
	// 	Inventory affected
	// 	Total cost
	// 	Total Revenue
	// 	Total Profit -->





