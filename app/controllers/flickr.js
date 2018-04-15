flickerApp.controller('FlickrCtrl',function($scope,Flickr,$cookies,$cookieStore){
  

// $scope.searchTexts = $cookies['searchText'];
$scope.searchText1=[];
// $cookieStore.put('Hello','dsyf');
// $cookies.put('myName','vinod');
// $cookies.remove('searchText');

$scope.searchTexts = $cookies.getObject('searchText');
$scope.searchTexts = $scope.searchTexts.filter(function(elem, pos) {
    return $scope.searchTexts.indexOf(elem) == pos;
});                //Remove Duplicate  
var pages=1;
$scope.photos=[];
$scope.getPhotos=function(search,page,check){
          $scope.noDataFound=false;
          
          $scope.searchTexts = $cookies.getObject('searchText');//Get search text from cookie 
          $scope.searchText=search;
          $scope.search=search;
	      $scope.loading=true;
          if($scope.searchTexts)                           //To upload cookie data continue
          $scope.searchText1=$scope.searchTexts;
          $scope.searchText1.push(search);

         $cookies.putObject('searchText',$scope.searchText1); //Set cookie
         if(check)
            $scope.photos=[];
         var promise = Flickr.search(search, page);
         promise.then(function(data) {
            // $scope.photos = data.photos;
            angular.forEach(data.photos.photo,function(value){
               $scope.photos.push(value);
            });

            if($scope.photos.length<=0)
                $scope.noDataFound=true;
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