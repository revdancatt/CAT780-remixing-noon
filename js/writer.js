writer = {
    
    startingPair: null,
    currentPair: null,
    newParagraphCounter: 0,
    newChapterCounter: 0,
    timer: null,

    init: function(pair) {

        if (this.timer !== null) {
            clearTimeout(this.timer);
        }

        this.startingPair = pair;
        this.currentPair = pair;

        $('.output').empty();

        this.newParagraphCounter = 0;
        this.newChapterCounter = 0;

        //  add a new paragraph
        this.newParagraph();

        //  add the first 2 words
        this.addWord(this.currentPair.split(' ')[0]);
        this.addWord(this.currentPair.split(' ')[1]);

        this.write();

    },

    write: function() {

        if (this.currentPair in wordsJSON) {

            var search = wordsJSON[this.currentPair];
            var word3 = wordsJSON[this.currentPair][Math.floor(Math.random()*wordsJSON[this.currentPair].length)];
            
            this.addWord(word3);

            this.currentPair = this.currentPair.split(' ')[1] + ' ' + word3;

            //  word out if we should break into a new paragraph
            if (word3.indexOf('.') == word3.length - 1 || word3.indexOf('?') == word3.length - 1 || word3.indexOf('?') == word3.length - 1) {
                
                this.newParagraphCounter++;
                var chanceToBreak = Math.ceil(Math.random() * 4);
                if (chanceToBreak < this.newParagraphCounter) {

                    this.newParagraphCounter = 0;
                    
                    //  increase the newChapterCounter
                    this.newChapterCounter++;

                    //  adda new paragraph
                    this.newParagraph();

                    // See if it's time to stop
                    chanceToBreak = Math.ceil(Math.random() * 20 + 1);
                    if (chanceToBreak < this.newChapterCounter) {
                        this.addWord('[EOM]');
                        return;
                    }

                }
            }

        } else {
            this.newChapterCounter++;
            this.newParagraph();
            this.addWord('[EOM]');
            return;
        }

        writer.timer = setTimeout(function() {writer.write();}, 35);

    },

    addWord: function(word) {

        var checkWord = word.replace(/'s|[\.,-\/#!$%\^&\*;:{}=\-_`~()']/g,"").trim().toLowerCase();
        var cleanWord = word.replace(/[Ã¢â‚¬Å“‚Å‚Å“]/g, "");

        if (checkWord in wordMap) {
            $('.output p.para' + this.newChapterCounter).append($('<span>').addClass('highlight').css('background', wordMap[checkWord]).text(cleanWord)).append(' ');
        } else {
            $('.output p.para' + this.newChapterCounter).html($('.output p.para' + this.newChapterCounter).html() + cleanWord + ' ');
        }

    },

    newParagraph: function() {

        if (this.newChapterCounter == 2) {
            var b = $('<a>').addClass('again').text('remix again');
            b.bind('click', function() {
                writer.init(writer.startingPair);
            })
            $('.output').append($('<figure>').addClass('pull').append(b));
        }

        $('.output').append($('<p>').addClass('para' + this.newChapterCounter));

    }
};

wordMap = {
    //  Names from Alice
    'alice': '#ddf5f8',
    'nola': '#f7f8dd'
};
