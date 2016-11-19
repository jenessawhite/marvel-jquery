function loadIt(){
var pageReq = $('#pageReq').val();
if (pageReq == '' || pageReq == null || pageReq == undefined) {
  alert('Your search terms were not valid')
} else {
  $(document).ready(function () {
    $.ajax(
      {
        url:"https://gateway.marvel.com:443/v1/public/characters?name=" + pageReq + "&limit=1&offset=0&apikey=c5ad4c48813d1a199d1f73777a6dea5f"
      })
      .done(function(marvel){
        var group = $('<div class="group"></div>')
        $.each(marvel.data.results,function(req, res){
          var subgroup = $('<div class="subgroup"></div>')
          //cover img
          subgroup.append($('<img/>').attr('src',res.thumbnail.path + "/detail." + res.thumbnail.extension));
          //courtesy of
          subgroup.append('<br>' + "Data provided by Marvel. © 2016 MARVEL");
            console.log("Data provided by Marvel. © 2016 MARVEL");
          //name
          subgroup.append('<br>' + res.name);
            console.log(res.name);
          //description
          subgroup.append($('<div class="description"></div>').text(res.description));
            console.log(res.description);
          //number of comics
          subgroup.append($('<p class="comics"></p>').text('Comics available: ' + res.comics.available));
            console.log(res.comics.available);
          //comic title
          subgroup.append($('<p class="comics"></p>').text(res.comics.items[0].name));
          console.log(res.comics.items[0].name);
          //comic description
          // subgroup.append('<br>' + res.name);
          //   console.log(res.comics.items[0].name);
          //attach the subgrop to an individual group div
          group.append(subgroup);

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

$('#loadReq').on("click", loadIt);
