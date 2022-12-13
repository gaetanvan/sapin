var snow = {

    wind : 0,
    maxXrange : 100,
    minXrange : 10,
    maxSpeed : 2,
    minSpeed : 1,
    color : "#fff",
    char : "*",
    maxSize : 20,
    minSize : 8,

    flakes : [],
    WIDTH : 0,
    HEIGHT : 0,

    init : function(nb){
        var snow = this,
            frag = document.createDocumentFragment();
        snow.getSize();



        for(var i = 0; i < nb; i++){
            var flake = {
                x : snow.random(snow.WIDTH),
                y : - snow.maxSize,
                xrange : snow.minXrange + snow.random(snow.maxXrange - snow.minXrange),
                yspeed : snow.minSpeed + snow.random(snow.maxSpeed - snow.minSpeed, 100),
                life : 0,
                size : snow.minSize + snow.random(snow.maxSize - snow.minSize),
                html : document.createElement("span")
            };

            flake.html.style.position = "absolute";
            flake.html.style.top = flake.y + "px";
            flake.html.style.left = flake.x + "px";
            flake.html.style.fontSize = flake.size + "px";
            flake.html.style.color = snow.color;
            flake.html.appendChild(document.createTextNode(snow.char));

            frag.appendChild(flake.html);
            snow.flakes.push(flake);
        }

        document.body.appendChild(frag);
        snow.animate();

        window.onresize = function(){snow.getSize();};
    },

    animate : function(){
        var o = this;
        for(var i = 0, c = o.flakes.length; i < c; i++){
            var flake = o.flakes[i],
                top = flake.y + flake.yspeed,
                left = flake.x + Math.sin(flake.life) * flake.xrange + o.wind;
            if(top < o.HEIGHT - flake.size - 10 && left < o.WIDTH - flake.size && left > 0){
                flake.html.style.top = top + "px";
                flake.html.style.left = left + "px";
                flake.y = top;
                flake.x += o.wind;
                flake.life+= .01;
            }
            else {
                flake.html.style.top = -o.maxSize + "px";
                flake.x = o.random(o.WIDTH);
                flake.y = -o.maxSize;
                flake.html.style.left = flake.x + "px";
                flake.life = 0;
            }
        }
        setTimeout(function(){
            o.animate();
        },20);
    },

    random : function(range, num){
        var num = num?num:1;
        return Math.floor(Math.random() * (range + 1) * num) / num;
    },

    getSize : function(){
        this.WIDTH = window.innerWidth;
        this.HEIGHT = window.innerHeight;
    }

};

function change() {
    var docu = document.getElementsByClassName('deco');
    var color = return 'hsla(' + (Math.random() * 360) + ', 100%, 50%, 1)';
    for (var i = 0; i < docu.length; i++) {
        docu[i].style.backgroundColor = color[i];
    }
    console.log(docu)
}
setInterval(change, 1000);


