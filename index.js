// 54a657a524bbaa7643aadcbdcc0c0b68
// Secret: 7e7f8c08a8d56df6

async function search() {
  let yourAPI_KEY = "54a657a524bbaa7643aadcbdcc0c0b68"; //Personal key to get access to flickr
  let userKeyword = document.getElementById("userKeyword").value; //Input of user to search for photos
  let flickrURL = `https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${yourAPI_KEY}&text=${userKeyword}&per_page=20&format=json&nojsoncallback=1`; //URL to access the flickr with Json as return value

  // Make API request
  fetch(flickrURL)
    .then(response => {
      return response.json(); //Get the url to return response as json format
    })
    .then(data => {
      console.log(data);

      // Clear the photos
      document.getElementById("output").innerHTML = "";

      // Access the properties of the object returned by response
      data.photos.photo.forEach(getPic => {
        var farmId = getPic.farm;
        var serverId = getPic.server;
        var id = getPic.id;
        var secret = getPic.secret;

        // let result = `<img src ="https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg">`;
        let result = `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`;
        // According to flickr URL format //https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg* to retrieve the photos using keywords

        // Div to display the pictures from the search
        let output = document.getElementById("output");

        // Create new img item
        let flickrImage = document.createElement("img");
        flickrImage.src = result;

        // Create lightbox div using js
        const lightbox = document.createElement("div");
        lightbox.id = "lightbox";
        document.body.appendChild(lightbox);

        flickrImage.addEventListener("click", () => {
          //Add the overlay
          lightbox.classList.add("active");
          const img = document.createElement("img");
          //Set the image of the lightbox to be the flickr image from data API
          img.src = flickrImage.src;
          lightbox.appendChild(img);
        });

        // For exiting the lightbox
        lightbox.addEventListener("click", e => {
          //If the pointer is clicking on the current target picture, just return but do not exit from the function
          if (e.target !== e.currentTarget) return;
          //Take away active when clicking other than the target picture
          lightbox.classList.remove("active");
        });

        //Display the search result on HTML div output
        output.appendChild(flickrImage);
      });
    })
    .catch(error => {
      console.log(error);
    });
}
