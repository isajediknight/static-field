class ColoredText {
  constructor(name, red, green, blue) {
    this.name = name;
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.ansi_1 = '0';
    this.ansi_2 = '38';
    this.ansi_3 = '2';
  }
  to_string(string) {
    return '\x1b[' + this.ansi_1 + ';'+ this.ansi_2 + ';' + this.ansi_3 + ';' + this.red + ';' + this.green + ';' + this.blue +'m' + string + '\x1b[0m'
  }
}
module.exports = ColoredText;

//tableau_10_blue = AdvancedColor('Tableau 10 Blue',31,119,180,0,38,2)
/*    def __init__(self,name='white',red='0',green='0',blue='0',ansi_1='0',ansi_2='38',ansi_3='2'):
        self.name = str(name)
        self.ansi_1 = str(ansi_1)
        self.ansi_2 = str(ansi_2)
        self.ansi_3 = str(ansi_3)
        self.red = str(red)
        self.green = str(green)
        self.blue = str(blue)
*/
//return '\x1b[' + self.ansi_1 + ';'+ self.ansi_2 + ';' + self.ansi_3 + ';' + self.red + ';' + self.green + ';' + self.blue +'m' + string + '\x1b[0m'