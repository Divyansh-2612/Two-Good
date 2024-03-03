function scrolltriggers(){
gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".amin"),
  smooth: true,
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".amin" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".amin", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight,};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".amin").style.transform ? "transform" : "fixed",
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}
scrolltriggers();
gsap.to(".navprt1 svg",{
    transform:"translateY(-100%)",
    ScrollTrigger:{
        trigger:".page1",
        scroller:".amin",
        start:"top 0",
        end:"top -5%",
        scrub:true,

    }
});

function videocon(){
const videocon=document.querySelector(".video-cont");
const plybtn=document.querySelector(".play");
videocon.addEventListener("mouseenter",function(){
    gsap.to(plybtn,{scale:1,
    opacity:1});
});
videocon.addEventListener("mouseleave",function(){
    gsap.to(plybtn,{scale:0,
    opacity:0});
});
videocon.addEventListener("mousemove",function(dets){
    gsap.to(plybtn,{
        left:dets.x-30,
        top:dets.y-30
    });
});
};
videocon();
function loading(){
    gsap.from(".page1 h1",{
        y: 100,
        opacity: 0,
        delay: 0.5,
        duration: 0.9,
        // stagger: 0.3,
    
    });
    gsap.from(".page1 .video-cont",{
        scale:0.9,
        opacity:0,
        delay:1.5,
        duration:0.5,
    });
}
loading();
document.addEventListener("mousemove",function(dets){
    gsap.to(".cursor",{
        left:dets.x,
        top:dets.y,
    });
});
document.querySelectorAll(".box").forEach(function(elem){
    let et=elem.getAttribute("id");
    if(et==="box1" || et==="box3"){
    elem.addEventListener("mouseenter",function(){
       gsap.to(".cursor",{
            transform:"translate(-50%,-50%) scale(1)",
            backgroundColor:"rgb(247, 216, 160)",
        });
    });
    }
    else{
        elem.addEventListener("mouseenter",function(){
            gsap.to(".cursor",{
                transform:"translate(-50%,-50%) scale(1)",
                backgroundColor:"lightgrey",
             });
         });
    }

    elem.addEventListener("mouseleave",function(){
        gsap.to(".cursor",{
            transform:"translate(-50%,-50%) scale(0)",
        });
    });
});
