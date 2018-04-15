flickerApp.controller('FlickrCtrl',function($scope,Flickr,$cookies,$cookieStore){
  

$scope.searchText1=[];

// $cookies.put('myName','vinod');
// $cookies.remove('searchText');

$scope.searchTexts = $cookies.getObject('searchText') ? $cookies.getObject('searchText'):[];
                
$scope.searchTexts = $scope.searchTexts.filter((searchText,index)=>$scope.searchTexts.indexOf(searchText) == index);  //Remove Duplicate 
var pages=1;
$scope.photos=[];
$scope.getPhotos=function(search,page,check){
          $scope.noDataFound=false;
          
          $scope.searchTexts = $cookies.getObject('searchText') ? $cookies.getObject('searchText'):[];//Get search text from cookie 
          
          $scope.searchText=search;
          $scope.search=search;                            //on select recent , put data to search input
	      $scope.loading=true;
          if($scope.searchTexts.length>0)                           //To upload cookie data continue
          $scope.searchText1=$scope.searchTexts;
          $scope.searchText1.push(search);

         $cookies.putObject('searchText',$scope.searchText1); //Set cookie
         $scope.searchTexts = $scope.searchTexts.filter((searchText,index)=>$scope.searchTexts.indexOf(searchText) == index);  //Remove Duplicate 
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