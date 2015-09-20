$(function() {
    
    $('button#spin-button').on('click', function(){
        var reelSpinNum1 = generateRandomSpinNum(1, 3);
        var reelSpinNum2 = generateRandomSpinNum(1, 3);
        var reelSpinNum3 = generateRandomSpinNum(1, 3);
        
        var reelOne = $('#reel-one');
        var reelTwo = $('#reel-two');
        var reelThree = $('#reel-three');
        
        $('.slot-machine-reel').removeAttr('style');
        $('.message').addClass('moving').find('p').html('win a free coffee, tea, or espresso!');
        $('body').removeClass('win');
        var button = $(this);
        button.addClass('disabled');
        
        
        $('#reel-one').addClass('spining-'+reelSpinNum1);
        $('#reel-two').addClass('spining-'+reelSpinNum2);
        $('#reel-three').addClass('spining-'+reelSpinNum3);
        
        setTimeout(function(){
            reelOnePosition = '50% ' + (reelOne.css('background-position').split(' ')[1].substr(0, 4) % 1200) + 'px';
            reelTwoPosition = '50% ' + (reelTwo.css('background-position').split(' ')[1].substr(0, 4) % 1200) + 'px';
            reelThreePosition = '50% ' + (reelThree.css('background-position').split(' ')[1].substr(0, 4) % 1200) + 'px';

            reelOne.css('background-position', reelOnePosition).attr('class',
                function(i, c){
                   return c.replace(/(^|\s)spining-\S+/g, '');
                });
            reelTwo.css('background-position', reelTwoPosition).attr('class',
                function(i, c){
                   return c.replace(/(^|\s)spining-\S+/g, '');
                });
            reelThree.css('background-position', reelThreePosition).attr('class',
                function(i, c){
                   return c.replace(/(^|\s)spining-\S+/g, '');
                });
                
            if (reelOnePosition === reelTwoPosition  && reelTwoPosition == reelThreePosition) {
                $('.message').removeClass('moving').find('p').html('You win!!!');
                $('body').addClass('win');
            }
            
            button.removeClass('disabled');
            
        }, 6500);
    });
});


function generateRandomSpinNum (minimum, maximum) {
    var randomNumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    return randomNumber;
}