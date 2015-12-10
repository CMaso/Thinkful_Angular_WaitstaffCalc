angular.module('myApp',[])



.controller('myCtrl', function($scope){
	
	$scope.numMeals = 0;
	$scope.subTotal = 0;
	$scope.tip = 0;
	$scope.chargesTotal = 0;
	$scope.tipTotal = 0;
	$scope.avgTipMeal = 0;

	$scope.data = {};
	$scope.data.baseMealPrice = 0;
	$scope.data.taxRate = 0;
	$scope.data.tipPercentage = 0;
	
	$scope.numPattern = new RegExp("^[0-9]+([.][0-9]+)?$");
	
	
	
	$scope.doSubmit = function(isValid) {

		if(isValid) {
			//$scope.submitted = true;
			$scope.subTotal = $scope.getSubTotal($scope.data.baseMealPrice, $scope.data.taxRate);
			$scope.tip = $scope.getTip($scope.data.baseMealPrice, $scope.data.tipPercentage);
			$scope.chargesTotal = $scope.round($scope.subTotal + $scope.tip, 2);
			
			$scope.tipTotal = $scope.round($scope.tipTotal + $scope.tip, 2);
			$scope.numMeals = $scope.numMeals + 1;
			$scope.avgTipMeal = $scope.round($scope.tipTotal / $scope.numMeals, 2);

			$scope.data.baseMealPrice = 0;
			$scope.data.taxRate = 0;
			$scope.data.tipPercentage = 0;
		}
		else {
			console.log("Form is not valid");
		}
	};

	$scope.getSubTotal = function(price, taxRate) {
		price = Number(price);
		taxRate = Number(taxRate);

		return (price + $scope.round(price * (taxRate/100),2));
	};

	$scope.getTip = function(price, percent) {
		price = Number(price);
		percent = Number(percent);
		
		return $scope.round(price * (percent/100),2);
	};

	$scope.round = function(value, decimals) {
		return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
	};
	
	$scope.doCancel = function() {
		$scope.data.baseMealPrice = 0;
		$scope.data.taxRate = 0;
		$scope.data.tipPercentage = 0;
		$scope.myForm.$setPristine();
		$scope.myForm.$setUntouched();
	};

	$scope.reset = function() {
		$scope.doCancel();
		$scope.numMeals = 0;
		$scope.subTotal = 0;
		$scope.tip = 0;
		$scope.chargesTotal = 0;
		$scope.tipTotal = 0;
		$scope.avgTipMeal = 0;
	};
	
});