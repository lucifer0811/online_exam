app.controller('categoriesCtrl', function ($scope, $modal, $filter, Data) {
    $scope.category = {};
    Data.get('categories').then(function(data){
        $scope.categories = data;
    });
    $scope.deletecategory = function(category){
        if(confirm("Are you sure to remove the category")){
            Data.delete("categories/"+category.id).then(function(result){
                $scope.categories = _.without($scope.categories, _.findWhere($scope.categories, {id:category.id}));
            });
        }
    };
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/categoryEdit.html',
          controller: 'categoryEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.categories.push(selectedObject);
                $scope.categories = $filter('orderBy')($scope.categories, 'id', 'reverse');
            }else if(selectedObject.save == "update"){
                p.name = selectedObject.name;
                p.description = selectedObject.description;
            }
        });
    };

 $scope.columns = [
                    {text:"ID",predicate:"id",sortable:true,dataType:"number"},
                    {text:"Name",predicate:"name",sortable:true},
                    {text:"Description",predicate:"description",sortable:true},
                ];

});


app.controller('categoryEditCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.category = angular.copy(item);

        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.title = (item.id > 0) ? 'Edit category' : 'Add category';
        $scope.buttonText = (item.id > 0) ? 'Update category' : 'Add New category';

        var original = item;
        $scope.isClean = function() {
            return angular.equals(original, $scope.category);
        }
        $scope.savecategory = function (category) {
            category.uid = $scope.uid;
            if(category.id > 0){
                Data.put('categories/'+category.id, category).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(category);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }else{
                Data.post('categorys', category).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(category);
                        x.save = 'insert';
                        x.id = result.data;
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }
        };
});
