window.addEventListener("load",function(){
    displayData();
    let searc_btn=document.getElementById("search-btn");
    searc_btn.addEventListener("click",function(){
        let search_txt=document.getElementById("search-txt").value;
        localStorage.setItem("currentSearch",JSON.stringify(search_txt));
        window.location.href="searchpage.html";
    });
});
var key="AIzaSyCD-hobB_fvpQqfOjJ0NrT52EHyKSvc8x0";
var url=`https://youtube.googleapis.com/youtube/v3/videos?chart=mostPopular&regionCode=IN&key=${key}&maxResults=20&part=snippet`;
async function getData()
{
    var res=await fetch(url);
    var data=await res.json();

    return data.items;

}
async function displayData()
{
    var data = await getData();
    if(data==undefined)
    {
        return false;
    }

    console.log("hello");
    var container=document.getElementById("main-content");
    console.log(data);
    data.forEach(item => {
        let poster=document.createElement("div");
        poster.setAttribute("class","poster");
        poster.setAttribute("value",item.id);
        poster.addEventListener("click",function(){
        let post_btn=document.getElementsByClassName("poster");
                   var res=this.getAttribute("value");
                   localStorage.setItem("currentVideoId",JSON.stringify(res));
                   window.location.href="../page.html";
          });
          let box_1=document.createElement("div");
          box_1.setAttribute("class","box_1");
          var img_1=document.createElement("img");
          img_1.setAttribute("src",item.snippet.thumbnails.high.url);
         
          box_1.append(img_1);

          let box_2=document.createElement("div");
          box_2.setAttribute("class","box_2");
          let channel_logo=document.createElement("div");
          channel_logo.setAttribute("class","channel_logo");
          let img_2=document.createElement("img");
          img_2.setAttribute("src",item.snippet.thumbnails.default.url);
          channel_logo.append(img_2);
          let video_title=document.createElement("div");
          video_title.setAttribute("class","video_title");
          let p=document.createElement("p");
          p.innerHTML=item.snippet.title;
          video_title.append(p);
          box_2.append(channel_logo,video_title);
        
          poster.append(box_1,box_2);
          container.append(poster);
    });
}


////////////////////////////////////////////////////////////////////////////////////