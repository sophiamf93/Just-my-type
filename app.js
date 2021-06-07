$(document).ready(function () {

    let upperKB = $('#keyboard-upper-container');
    let lowerKB = $('#keyboard-lower-container');
    let sentences = [

        'ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'

    ];

    let sentencesIndex = 0;
    let letterIndex = 0;
    let currentSentence = sentences[sentencesIndex];
    let currentLetter = currentSentence[letterIndex];
    const words = 54
    let mistakes = 0;
    let start = 0
    let end = 0
    let wpm = 0
    let minutes = 0

    $('#sentence').remove();
    $('body').prepend('<div class="end-class" id="sentence"></div>')

    $('#sentence').text(currentSentence);
    $('#target-letter').text(currentLetter);
    $('#keyboard-upper-container').hide()


    highlight_sentence = currentSentence.highlightAt(letterIndex)
    $('#sentence').html(highlight_sentence);


    $(document).keydown(function (e) {

        if (e.which) {
            upperKB.show();
            lowerKB.hide();
        }

    })

    $(document).keyup(function (e) {

        if (e.which) {
            upperKB.hide();
            lowerKB.show();
        }

        $('.highlight').removeClass('highlight');

    })

    $(document).keypress(function (e) {

        $('#' + e.which).addClass('highlight');

        if (start == 0) {
            start = new Date();
        }

        if (currentSentence.charCodeAt(letterIndex) == e.which) {

            $('#feedback').append('<span class="glyphicon glyphicon-ok"></span>');
            letterIndex++;

            highlight_sentence = currentSentence.highlightAt(letterIndex)
            $('#sentence').html(highlight_sentence);

        } else {

            $('#feedback').append('<span class="glyphicon glyphicon-remove"></span>');
            mistakes++
        }

    })

    currentLetter = currentSentence[letterIndex];
    $('#target-letter').text(currentLetter);


    if (letterIndex < currentSentence.length) {
        letterIndex += 1

    } else {

        if (sentencesIndex < 4) {
            sentencesIndex++
            currentSentence = sentences[sentencesIndex]
            $('#sentence').text(currentSentence)
            letterIndex = 0
            $('#target-letter').text(currentSentence[letterIndex]);
            $('#feedback').empty();
            highlight_sentence = currentSentence.highlightAt(letterIndex)
            $('#sentence').html(highlight_sentence);

        } else {

            if (end == 0) {
                end = new Date();
                minutes = (end - start) / 60000
                wpm = words / minutes - 2 * mistakes
                $('#feedback').empty();
                $('#target-letter').empty()
            }

            if (mistakes !== 1) {
                $('#sentence').text('You ran out of sentences! Your typing speed was ' + wpm.toFixed(0) + ' words per minute with ' + mistakes + ' mistakes!')

            } else {

                $('#sentence').text('You ran out of sentences! Your typing speed was ' + wpm.toFixed(0) + ' words per minute with ' + mistakes + ' mistake!')
            }

            $('#target-letter').append('<button class=playAgain>Play Again</button>')
            $('.playAgain').slideUp(300).delay(1000).fadeIn(2000);
            $('.playAgain').click(function () {
                location.reload(true)
            });
        };
    }
});

String.prototype.highlightAt = function (index) {
    return this.substr(0, index) + '<span class="highlight2">' + this.substr(index, 1) + '</span>' + this.substr(index + 1);
}
