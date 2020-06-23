// 对象收编变量
var bird = {
    skyPosition : 0,
    skyStep : 2,
    birdTop : 220,
    birdStepY: 0,
    startColor : 'blue',
    startFlag : false,
    minTop: 0,
    maxTop: 665,
    init: function(){
        this.initDate();
        this.animate();
        this.handel();
    },
    initDate: function(){
        this.el = document.getElementById('game');
        this.oBrid = this.el.getElementsByClassName('bird')[0];
        this.oStart = this.el.getElementsByClassName('start')[0];
        this.oScore = this.el.getElementsByClassName('score')[0];
        this.oMask = this.el.getElementsByClassName('mask')[0];
    },
    // animate管理所有动画函数
    animate: function(){
        // this === bird (this指向)
        var self = this;
        var count = 0;
        
        this.timer = setInterval(function() {
            self.skyMove();
            if(self.startFlag){
                self.birdDrop();
            }
            if(++ count % 10 === 0){
                if(!self.startFlag){
                    self.birdJump();
                    self.startBound();
                }
                self.birdFly(count);
            }
        }, 30)
    },
    birdFly: function(count){
        this.oBrid.style.backgroundPositionX = count % 3 * -30 + "px";
    },
    birdJump: function(){
        this.birdTop = this.birdTop === 220 ? 260 : 220;
        this.oBrid.style.top = this.birdTop + "px";
    },
    birdDrop: function(){
        this.birdTop += ++ this.birdStepY;
        this.oBrid.style.top = this.birdTop + "px";
        this.judgeKnock();
    },
    skyMove: function(){
        this.skyPosition -= this.skyStep;
        this.el.style.backgroundPositionX = this.skyPosition + "px";
    },
    startBound: function(){
        var perColor = this.startColor;
        this.startColor = perColor === 'blue' ? 'white' : 'blue';

        this.oStart.classList.remove('start-' + perColor);
        this.oStart.classList.add('start-' + this.startColor);
    },
    /**
     * 碰撞检测
     */
    judgeKnock: function(){
        this.judgeBorder();
        this.judgePipe();
    },
    // 边缘检测
    judgeBorder: function(){
        if(this.birdTop < this.minTop || this.birdTop > this.maxTop){
            this.failGame();
        }
    },
    // 碰到柱子
    judgePipe: function(){

    },
    /**
     * 事件
     */
    handel : function(){
        this.handelStart();
    },
    handelStart: function(){
        var self = this;
        this.oStart.onclick = function(){
            self.startFlag = 'true';
            self.oStart.style.display = "none";
            self.oScore.style.display = "block";
            self.skyStep = 5;
            self.oBrid.style.left = '80px';
        };  
    },
    failGame: function(){
        clearInterval(this.timer);
    }
};
