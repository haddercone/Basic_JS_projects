var add = document.querySelector("#add");
var sub = document.querySelector("#sub");
var counterValue = document.querySelector("#counter");
var counter = parseInt(counterValue.innerHTML)

const price = document.querySelector("#value");
const value= parseInt(price.innerHTML)

window.onload = function(){
    sub.setAttribute("disabled", 'true');
    sub.setAttribute("style", 'opacity:0.6;');

    add.addEventListener("click", 
        function  () {
            counter+=1;
            if(counter >= 1){
                sub.removeAttribute("disabled");
                sub.removeAttribute("style");
            }
            counterValue.innerHTML = counter;
            price.innerHTML = counter*value;
            // console.log(price.innerHTML)
            // console.log(counter)
        }
    );
    sub.addEventListener("click", 
        function  () {
            counter-=1;
            if(counter <=1){
                sub.setAttribute("disabled", 'true');
                sub.setAttribute("style", 'opacity:0.6;');
                
            }
            price.innerHTML = value*counter;
            // console.log(price.innerHTML)
            counterValue.innerHTML = counter;
            // console.log(counter)
            
            
        }
    );

}
// f()

// console.log(typeof(parseInt(counterValue)))