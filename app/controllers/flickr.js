flickerApp.controller('FlickrCtrl',function($scope,Flickr){
$scope.name="Vinod";

$scope.getPhotos=function(search){
	$scope.photos=[];
	$scope.loading=true;
  var promise = Flickr.search(search, 1);
        promise.then(function(data) {
            // $scope.photos = data.photos;
            $scope.photos = data.photos.photo;
            $scope.page = data.photos.page;
            $scope.pages = data.photos.pages;
            $scope.total = data.photos.total;
            $scope.loading = false;


        }, function(err) {
            console.log('Failed: ' + err);
            $scope.loading = false;
        });
    }


});