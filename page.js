window.addEventListener("load",function(){
    let url="https://www.youtube.com/embed/";
    var data=JSON.parse(localStorage.getItem("currentVideoId"));
    if(data!=null && data!="" && data!=undefined)
    {
        let iframe=document.getElementById("iframe");
        url+=data+"?autoplay=1";
        iframe.setAttribute("src",url);
    }
});