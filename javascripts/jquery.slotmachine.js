/* 
    Created on : Sep 17, 2015, 5:04:20 PM
    Author     : rsee
*/
;(function ( $, window, document, undefined ) {

    "use strict";

    // Create the defaults once
    var slotMachine = "slotMachine",
        defaults = {
            winMessage: "You win!!!",
            spinMessage: "win a free coffee, tea, or espresso!",
            timeForTimeout: 6500, // 6.5 seconds
            spriteImageHeight: 1200 // 1200 pixels
    };

    // The actual plugin constructor
    function SlotMachine ( element, options ) {
        this.element = element;
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = slotMachine;
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(SlotMachine.prototype, {
        init: function () {
            this.spinButton = $(this.element).find('button');
            this.slotMachineReels = $(this.element).find('.slot-machine-reel');
            this.message = $(this.element).find('.message');
            this.reelOne = $(this.element).find('#reel-one');
            this.reelTwo = $(this.element).find('#reel-two');
            this.reelThree = $(this.element).find('#reel-three');
            
            this.bindEvents();
        },
        spinTheReels: function (reelSpinNum1, reelSpinNum2, reelSpinNum3) {
            this.spinButton.addClass('disabled');
            this.reelOne.addClass('spining-'+reelSpinNum1);
            this.reelTwo.addClass('spining-'+reelSpinNum2);
            this.reelThree.addClass('spining-'+reelSpinNum3);
        },
        resetSlotMachine: function () {
            this.slotMachineReels.removeAttr('style');
            this.message.addClass('moving').find('p').html(this.settings.spinMessage);
            $('body').removeClass('win');
        },
        generateRandomSpinNum: function (minimum, maximum) {
            var randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
            return randomNumber;
        },
        getReelVerticalPosition: function (reel) {
            return (reel.css('background-position').split(' ')[1].substr(0, 4) % this.settings.spriteImageHeight);
        },
        resetRealVerticalPosition: function (reel) {
            reel.attr('class',
                function(i, c){
                   return c.replace(/(^|\s)spining-\S+/g, '');
            });
        },
        setWiningState: function () {
            this.message.removeClass('moving').find('p').html(this.settings.winMessage);
            $('body').addClass('win');
        },
        checkIfWin: function (thisObj) {
            var reelOnePosition, reelTwoPosition, reelThreePosition;
            var reelOne = thisObj.reelOne;
            var reelTwo = thisObj.reelTwo;
            var reelThree = thisObj.reelThree;
            
            reelOnePosition = '50% ' + thisObj.getReelVerticalPosition(reelOne) + 'px';
            reelTwoPosition = '50% ' + thisObj.getReelVerticalPosition(reelTwo) + 'px';
            reelThreePosition = '50% ' + thisObj.getReelVerticalPosition(reelThree) + 'px';

            reelOne.css('background-position', reelOnePosition);
            thisObj.resetRealVerticalPosition(reelOne);

            reelTwo.css('background-position', reelTwoPosition);
            thisObj.resetRealVerticalPosition(reelTwo);

            reelThree.css('background-position', reelThreePosition);
            thisObj.resetRealVerticalPosition(reelThree);

            if (reelOnePosition === reelTwoPosition  && reelTwoPosition === reelThreePosition) {
                thisObj.setWiningState();
            }

            thisObj.spinButton.removeClass('disabled');
        },
        bindEvents: function() {
            var thisObj = this;
            var reelOne = this.reelOne;
            var reelTwo = this.reelTwo;
            var reelThree = this.reelThree;
            
            this.spinButton.on('click', function(){
                var reelSpinNum1 = thisObj.generateRandomSpinNum(1, 3);
                var reelSpinNum2 = thisObj.generateRandomSpinNum(1, 3);
                var reelSpinNum3 = thisObj.generateRandomSpinNum(1, 3);
                
                reelOne.addClass('spining-'+reelSpinNum1);
                reelTwo.addClass('spining-'+reelSpinNum2);
                reelThree.addClass('spining-'+reelSpinNum3);
                
                thisObj.resetSlotMachine();
                thisObj.spinTheReels(reelSpinNum1, reelSpinNum2, reelSpinNum3);
                
                setTimeout(function(){
                    thisObj.checkIfWin(thisObj);
                }, thisObj.settings.timeForTimeout);
            });
        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ slotMachine ] = function ( options ) {
        return this.each(function() {
            if ( !$.data( this, "plugin_" + slotMachine ) ) {
                $.data( this, "plugin_" + slotMachine, new SlotMachine( this, options ) );
            }
        });
    };

})( jQuery, window, document );