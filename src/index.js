function loadIt(){
  // //generate random number for comic to access
  function randomIntFromInterval() {
    var random = Math.floor(Math.random()*(20-0+1)+0)
    return random;
  }
  var pageReq = $('.pageReq').val();
  if (pageReq == '' || pageReq == null || pageReq == undefined) {
    alert('Don\'t forget to enter your character!')
  } else {
    $(document).ready(function () {
      $.ajax(
        {
          url:"https://gateway.marvel.com:443/v1/public/characters?name=" + pageReq + "&limit=5&offset=0&apikey=c5ad4c48813d1a199d1f73777a6dea5f"
        })
        .done(function(marvel){
          var group = $('<div class="group"></div>')
          $.each(marvel.data.results,function(req, res){
            //produce random number for comic
            var number = randomIntFromInterval(0,20)
            //cover img
            group.append($('<img class="character-photo"/>').attr('src',res.thumbnail.path + "/detail." + res.thumbnail.extension));
            //courtesy of
            group.append($('<p class="credit"></p>').text('Data provided by Marvel. © 2016 MARVEL'));
            //name
            group.append($('<h1 class="name"></h1>').text(res.name));
            //description
            group.append($('<p class="description"></p>').text(res.description));
            //number of comics
            group.append($('<p class="available"></p>').text('Comics available: ' + res.comics.available));
            //comic title
            group.append($('<p class="comic"></a>').text(res.comics.items[number].name));
            //comic description
            // subgroup.append('<br>' + res.name);
            //   console.log(res.comics.items[0].name);
            //attach the subgrop to an individual group div
            //button to take them to MARVEL
            group.append($('<a class="comic-link" target="_blank"></a>').attr('href', res.comics.items[number].resourceURI).text('I\'m in!'));
          })
          $('.content').empty().append(group);
        })
        .fail(function(err){
        // the error codes are listed on the dev site
          console.log(err);
          alert("Uh oh! We've got some errors here! Please try again later. We promise we'll fix it", err)
        })
      });
    }
}


//   .done(function(data) {
//     // sort of a long dump you will need to sort through
//     console.log(marvel);
//   })
//   .fail(function(err){
//     // the error codes are listed on the dev site
//     console.log(err);
//   });
// })

$('.loadReq').on("click", loadIt);
//
//
// function loadIt(){
// var heroReq = $('#heroReq').val();
// if (heroReq == '' || heroReq == null || heroReq == undefined) {
//   alert('Your search terms were not valid')
// } else {
//   $.ajax({
//    url:"https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=" + heroReq + "&limit=20&apikey=a799d9e6415c9aaf43e9154921a45d92"
//   }).then(function(char){
//      var group = $('<div class="groups"></div>');
//      $.each(char.data.results, function(req, res){
//         var subgroup = $('<div class="subgroup"></div>')
//         if (res.thumbnail.path === 'self' || res.thumbnail.path === null) {
//           subgroup.append($('<br>' + '<img class="thumbplace">').attr('src', 'assets/reinhardt.jpg'));
//         } else {
//         subgroup.append($('<br>' + '<img class="thumbs">').attr('src', res.thumbnail.path + '.jpg'));
//         };
//         subgroup.append('<br>' + 'Name: ' + res.name);
//         subgroup.append('<br>' + 'Character ID: ' + res.id);
//         subgroup.append('<br>' + '# of Comics: ' + res.comics.available);
//         subgroup.append('<br>' + '# of Stories: ' + res.stories.available);
//         subgroup.append('<br>' + '# of Events: ' + res.events.available);
//         subgroup.append('<br>' + '# of Series: ' + res.series.available);
//         subgroup.append('<br>' + '<a class="urlLink"></a>' + res.resourceURI).attr('href', res.resourceURI);
//         group.append(subgroup)
//     })
//     $('.marvel').empty().append(group);
//    });
//
// };
// }
// $('#heroSelect').on("click", loadIt);
