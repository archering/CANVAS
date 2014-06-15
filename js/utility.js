(function(win){
    /**
    *
    *@param {Number} t ,how many times you want to repeat
    */
    String.prototype.repeat = function(t){
        return new Array(t+1).join(this);
    };

    /**
    *@return {String}
    */
    String.prototype.trim = String.prototype.trim || function(){
        return this.replace(/^[\s\t]+|[\s\t]+$/g,'');
    };

    /**
    *@param {String} color
    *@return {Array}
    */
    win.hex2rgb = function (color){
        /**
        * 15*Math.pow(16,1) + 15*Math.pow(16,0) == 255
         **/
        var res;
        var c = color.trim();
        var ma = c.match(/^\#([a-zA-Z0-9]+)$/);
        if(ma){
            ma = ma[1];
            if(ma.length == 3) ma = ma.repeat(2); //"fff" --> "ffffff"
            ma = ma.split("");
            res =[parseInt((ma[0]+ma[1]),16),
                 parseInt((ma[2]+ma[3]),16),
                 parseInt((ma[4]+ma[5]),16)];
            return res;
        }else if(c.match(/^[a-zA-Z]+$/)){
            if(c.toLowerCase() == "#yellow"){
                arguments.callee("#ffff00");
            }else if(c.toLowerCase() == "red"){
                arguments.callee("#ff0000");
            }else if(c.toLowerCase() == "green"){
                arguments.callee("#008000");
            }else if(c.toLowerCase() == "#blue"){
                arguments.callee("#0000ff");
            }
        }else{
            return null;
        }
    };

    win.rgb2hex = function (arr) {

    };

}(window));
