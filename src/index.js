
function loadIt(e) {
  e.preventDefault();

  //generate random number for comic to access
  function randomIntFromInterval() {
    var random = Math.floor(Math.random()*(20-0+1)+0)
    return random;
  }
  var pageReq = $('.pageReq').val();
    if (pageReq == '' || typeof pageReq == null || typeof pageReq == undefined) {
      alert('Don\'t forget to enter your character!')
    } else {
      $.ajax(
        {
          url:"https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=" + pageReq + "&limit=5&offset=0&apikey=c5ad4c48813d1a199d1f73777a6dea5f"
        })
        .done(function(marvel){
          var group = $('<div class="group"></div>')
          if (marvel.data.results < 1) {
            alert ('Sorry we can\'t find any MARVEL characters by that name!')
          } else {
            $.each(marvel.data.results,function(index, res){
              console.log(res);
              //produce random number for comic
              var number = randomIntFromInterval(0,20)
              //cover img
              group.append($('<img class="character-photo"/>').attr('src',res.thumbnail.path + "/detail." + res.thumbnail.extension));
              //courtesy of
              group.append($('<p class="credit"></p>').text('Data provided by Marvel. © 2016 MARVEL'));
              //name
              group.append($('<a class="name" target="_blank"></a>').attr('href', res.urls[0].url).text(res.name));
              //description
              group.append($('<p class="description"></p>').text(res.description));
              //number of comics
              group.append($('<p class="available"></p>').text('Comics available: ' + res.comics.available));
              //"Your Comic:"
              group.append($('<h3 class="yourcomic"></h3>').text('Your comic: '));
              //comic title
              if (res.comics.items.length > 0) {
                group.append($('<p class="comic"></a>').text(res.comics.items[number].name));
                //button to take them to MARVEL
                group.append($('<a class="comic-link" target="_blank"></a>').attr('href', res.comics.items[number].resourceURI).text('I\'m in!'));
              } else {
                group.append($('<p class="sorry"></a>').text('Sorry this character doesn\'t appear in any comics!'));
              }
              //button to take them to MARVEL
              group.append($('<hr>'));

            })
            $('.content').empty().append(group);
          }
        })
        .fail(function(err){
        // the error codes are listed on the dev site
          console.log(err);
          alert("Uh oh! We've got some errors here! Please try again later. We promise we'll fix it", err)
        })
      }
    }

  $('.search').on("submit", loadIt);




//   .done(function(data) {
//     // sort of a long dump you will need to sort through
//     console.log(marvel);
//   })
//   .fail(function(err){
//     // the error codes are listed on the dev site
//     console.log(err);
//   });
// })
//
