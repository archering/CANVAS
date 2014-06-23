;(function(){
    /**
    *@extension for the canvas api
    *@author:ericever
    *
    *Canvas中透明度支持分为全局与局部透明设置，全局透明度的设置可以通过设置

    Context.globalAlpha来实现。局部透明度可以通过fillStyle设置颜色值中alpha值通道

    来实现。两种方式代码如下：

    // change global alpha value

    ctx.globalAlpha=0.5;

    ctx.fillRect(50,50,75,50);

    // change fill style color's alphachannel

    ctx.fillStyle = 'rgba(225,225,225,0.5)';

    ctx.fillRect(50,50,75,50);
    *
    **/
    var g = CanvasRenderingContext2D;

    /***
    *
    *@param {Bool} p
    */
    g.prototype.clear = g.clear || function (p) {
        if (p) {
          this.save();
          this.setTransform(1, 0, 0, 1, 0, 0);
        }
        /**
        * this.canvas reference the current canvas
        */
        this.clearRect(0, 0, this.canvas.width, this.canvas.height);//clear a area
        if (p) {
          this.restore();
        }
    };
    /**
    *@param {String} color
    *@param {Number} alpha, [0,1]
    */
    g.prototype.beginFill = function (color,alpha) {
        var a = alpha || 1;
        if(a<=0) a = 0;
        var rgb = hex2rgb(color);
        this.fillStyle = 'rgba('+ rgb[0] + ',' + rgb[1] + ',' + rgb[2]+',' + a +')';
        this.fill();
    };
    /**
    *@param {Number} thickness
    *@param {String} color
    *@param {Number} alpha, [0,1]
    */
    g.prototype.lineStyle = function (thickness,color,alpha) {
      /**
        lineWidth = value   1,2, 3  ...
        Sets the widths of lines drawn in the future.
        lineCap = type    ['butt','round','square'];
        Sets the appearance of the ends of lines.
        lineJoin = type   ['round','bevel','miter'];
        Sets the apperance of the "corners" where lines meet.
        miterLimit = value miterLimit = max miterLength / lineWidth = 1 / sin ( min θ / 2 )
      */
        this.lineWidth = thickness;
        var rgb = hex2rgb(color);
        var a = alpha || 1;
        this.strokeStyle = 'rgba('+ rgb[0] + ',' + rgb[1] + ',' + rgb[2]+',' + a +')';
        this.stroke();
    };

    /**
    *draw a rectangle area
    *@param {Number} x, Xcoordinate
    *@param {Number} y,Ycoordinate
    *@param {Number} w,width
    *@param {Number} h,height
    */
    g.prototype.drawRect = function (x,y,w,h) {
        this.beginPath();
        this.moveTo(x,y);
        this.lineTo(x+w,y);
        this.lineTo((x+w),(y+h));
        this.lineTo(x,(y+h));
        this.closePath();
    };
    /**
    *
    */
    g.prototype.drawRoundRect = function (x,y,w,h,r) {
         this.beginPath();
         this.moveTo(x + r, y);
         this.lineTo(x + width - r, y);
         this.quadraticCurveTo(x + width, y, x + width, y + radius);
         this.lineTo(x + width, y + height - r);
         this.quadraticCurveTo(x + width, y + height, x + width - r, y+ height);
         this.lineTo(x + r, y + height);
         this.quadraticCurveTo(x, y + height, x, y + height - r);
         this.lineTo(x, y + r);
         this.quadraticCurveTo(x, y, x + r, y);
         this.closePath();
    };
    /**
    *draw circle;
    *
    */
    g.prototype.drawCircle = function (x,y,r){
        this.beginPath();
        this.arc(x,y,r,0,Math.PI*2,true);
    };

    /**
    *
    *@param {Array} arr
    *support 6 arguments  (x1,y1,x2,y2,x3,y3)
    */
    g.prototype.drawTrangle = function (arr) {
        if(arguments.length >1) arr = [].slice.call(arguments);
        this.beginPath();
        this.moveTo(arr[0],arr[1]);
        this.lineTo(arr[2],arr[3]);
        this.lineTo(arr[4],arr[5]);
    };


    g.prototype.shortcut = {
          /**
        *@param {Number} x, Xcoordinate
        *@param {Number} y,Ycoordinate
        *@param {Number} w,width
        *@param {Number} h,height
        *@style {String} style, "#ff0" or "#ff0000"
        */
        drawRectBox : function (x,y,w,h,style) {
            this.fillStyle = style;
            this.fillRect(x,y,w,h);
        },

        /**
        *@param {Number} x, Xcoordinate
        *@param {Number} y,Ycoordinate
        *@param {Number} w,width
        *@param {Number} h,height
        *@style {String} style, "yellow" or "#ff0000"
        */
        fillRectBox : function (x,y,w,h,style) {
            this.strokeStyle = style;
            this.strokeRect(x,y,w,h);
        },

        /**
        *@param {Number} x, Xcoordinate
        *@param {Number} y,Ycoordinate
        *@param {Number} w,width
        *@param {Number} h,height
        *@param {Object} o, {stroke:"#ff0000",fill:"#ff0000"}
        */
        fillRectWithBorder : function(x,y,w,h,o) {
            this.strokeStyle = o.stroke;
            this.fillStyle = o.fill;
            this.fillRect(x,y,w,h);
            this.strokeRect(x,y,w,h);
        }
    };

}());
