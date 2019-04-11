let keypad = {
  current: '',

  getInput: function() {
    if(this.current.length <= 4) {
      var output = this.current;
      this.current = '';
      return output;
    } else {
      return undefined;
    }
  },

  pressed: function(number) {
    if(this.current.length < 4) {
      this.current += number;
    }

    $('#d1').text(this.current.charAt(0));
    if(this.current.charAt(1) === '') {
      $('#d2').text('*');
    } else {
      $('#d2').text(this.current.charAt(1));
    }

    if(this.current.charAt(2) === '') {
      $('#d3').text('*');
    } else {
      $('#d3').text(this.current.charAt(2));
    }

    if(this.current.charAt(3) === '') {
      $('#d4').text('*');
    } else {
      $('#d4').text(this.current.charAt(3));
    }

  },
}
