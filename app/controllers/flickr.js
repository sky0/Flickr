flickerApp.controller('FlickrCtrl',function($scope,Flickr,$cookies){
// $cookies.putObject("searchText", [{}]);
$cookies.put("userName","Vinod");
$cookies.userName="Hello";
$scope.userName=$cookies.userName;
  var favoriteCookie = $cookies.get('myFavorite');
  // Setting a cookie
  $cookies.put('myFavorite', 'oatmeal');
// $scope.searchTexts=$cookies.get('searchText');
var pages=1;
$scope.photos=[];
$scope.getPhotos=function(search,page,check){
          if(check)
            $scope.photos=[];
    
          $scope.searchText=search;
	      $scope.loading=true;
    
   // $scope.searchText= $cookies.getObject('searchText');
  
   //  $cookies.putObject('searchText', $scope.searchText.push({search:search}));

   // $scope.searchTexts=$cookies.get('searchText');
       var promise = Flickr.search(search, page);
        promise.then(function(data) {
            // $scope.photos = data.photos;
            angular.forEach(data.photos.photo,function(value){
               $scope.photos.push(value);
            })
        //     if($scope.photos.length<=0)
        //     $scope.photos = data.photos.photo;
        // else
        //     $scope.photos.push(data.photos.photo);
            $scope.page = data.photos.page;
            $scope.pages = data.photos.pages;
            $scope.total = data.photos.total;
            $scope.loading = false;
        $(window).bind('scroll');

        }, function(err) {
            console.log('Failed: ' + err);
            $scope.loading = false;
        });
    }


    $scope.openModal=function(photo){

        $('.photoModal').modal('show');
        $scope.currentPhoto=photo;

    }

    $(window).scroll(function() {
 
    if($(window).scrollTop()==($(document).height()-window.innerHeight) ) {
           // ajax call get data from server and append to the div

           // $(window).unbind('scroll');
           pages=pages+1;
           $scope.getPhotos($scope.searchText,pages,false);
    }
});



});