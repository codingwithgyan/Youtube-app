window.addEventListener('load',function(){
    var search_data=JSON.parse(localStorage.getItem("currentSearch"));
    if(search_data!=null && search_data!=undefined && search_data!="")
    {
        let search_txt=document.getElementById("search-txt");
        search_txt.setAttribute("value",search_data);
         displayDataSearch(search_data);
    }
    else
    {
        alert("please search something");
    }
    
    let searc_btn=document.getElementById("search-btn");
    searc_btn.addEventListener("click",function(){
        let search_txt=document.getElementById("search-txt").value;
        localStorage.setItem("currentSearch",JSON.stringify(search_txt));
        window.location.href="searchpage.html";
    });
   
});

var key="AIzaSyCD-hobB_fvpQqfOjJ0NrT52EHyKSvc8x0";

async function getDataSearch(search_txt)
{
    var url=`https://youtube.googleapis.com/youtube/v3/search?q=${search_txt}&key=${key}&maxResults=20&part=snippet`;
    var res=await fetch(url);
    var data=await res.json();

    return data.items;

}
async function displayDataSearch(search_txt)
{
    var data = await getDataSearch(search_txt);
    if(data==undefined)
    {
        return false;
    }
    console.log(data);
    var container=document.getElementById("main-content");
    data.forEach(item => {
            let card=document.createElement("div");
            card.setAttribute("class","card");
            card.setAttribute("value",item.id.videoId);
            card.addEventListener("click",function(){
                let post_btn=document.getElementsByClassName("card");
                           var res=this.getAttribute("value");
                           localStorage.setItem("currentVideoId",JSON.stringify(res));
                           window.location.href="../page.html";
                  });

            let card_img=document.createElement("div");
            card_img.setAttribute("class","card_img");
            let img1=document.createElement("img");
            img1.setAttribute("src",item.snippet.thumbnails.high.url);
            card_img.append(img1);

            let card_detail=document.createElement("div");
            let div1=document.createElement("div");
            let p1=document.createElement("p");
            p1.innerHTML=item.snippet.title;
            p1.setAttribute("class","title");
            div1.append(p1);

            let div2=document.createElement("div");
            div2.setAttribute("class","channel_logo");
            var img2=document.createElement("img");
            img2.setAttribute("src",item.snippet.thumbnails.default.url);
            var a1=document.createElement("a");
            a1.innerHTML=item.snippet.channelTitle;
            div2.append(img2,a1);

            let card_desc=document.createElement("div");
            card_desc.setAttribute("class","card_desc");
            card_desc.innerHTML=item.snippet.description;
            card_detail.append(div1,div2,card_desc)
            card.append(card_img,card_detail);
            container.append(card);
    });
}