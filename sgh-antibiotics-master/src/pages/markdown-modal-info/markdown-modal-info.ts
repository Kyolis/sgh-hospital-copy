import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

export interface MarkdownDescription {
  title: string;
  cardContent: string;
  displayContent: string;
}

/**
 * The markdown-info UI (part of the edit-text component)
 */
@IonicPage()
@Component({
  selector: 'markdown-modal-info',
  templateUrl: 'markdown-modal-info.html',
})
export class MarkdownModalInfoPage {

  shownGroup = null;
  details= [];
  content: MarkdownDescription[] = [
    { title: "Headers",
      cardContent: "# H1 <br>## H2 <br>### H3 <br>#### H4 <br>##### H5 <br>###### H6 <br><br>Alternatively, for H1 and H2, an underline-ish style: <br>Alt-H1 <br>====== <br><br>Alt-H2 <br>------ <br>",
      displayContent: "<h1>H1</h1><h2>H2</h2><h3>H3</h3><h4>H4</h4><h5>H5</h5><h6>H6</h6><br>Alternatively, for H1 and H2, an underline-ish style:<br><h1>Alt-H1</h1><h2>Alt-H2</h2>"
      },
    { title: "Lists",
      cardContent: "1. First ordered list item <br>2. Another item <br>⋅⋅* Unordered sub-list. <br>1. Actual numbers don't matter, just that it's a number <br>⋅⋅1. Ordered sub-list <br>4. And another item. <br><br>" +
      "⋅⋅⋅You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown). <br>" +
      "<br>⋅⋅⋅To have a line break without a paragraph, you will need to use two trailing spaces.⋅⋅ <br>⋅⋅⋅Note that this line is separate, but within the same paragraph.⋅⋅ <br>" +
      "⋅⋅⋅(This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.) <br><br>* Unordered list can use asterisks <br>- Or minuses <br>Or pluses <br>",
      displayContent: "<ol><li>First ordered list item</li><li>Another item</li></ol><ul><li>Unordered sub-list.</li></ul><ol><li>Actual numbers don't matter, just that it's a number</li><br>" +
      "<li>Ordered sub-list</li><br><li>And another item.</li></ol><span style='padding-left: 40px'>" +
      "You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).<br><br>" +
      "To have a line break without a paragraph, you will need to use two trailing spaces.<br>Note that this line is separate, but within the same paragraph.<br>" +
      "(This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)<br></span><ul><li>Unordered list can use asterisks</li><br><li>Or minuses</li><br><li>Or pluses</li></ul>"},
    { title: "Links",
      cardContent: "[I'm an inline-style link](https://www.google.com)<br><br>[I'm an inline-style link with title](https://www.google.com \"Google's Homepage\")<br><br>" +
      "[I'm a reference-style link][Arbitrary case-insensitive reference text]<br><br>[I'm a relative reference to a repository file](../blob/master/LICENSE)<br><br>" +
      "[You can use numbers for reference-style link definitions][1]<br><br>Or leave it empty and use the [link text itself].<br><br>URLs and URLs in angle brackets will automatically get turned into links.<br><br>" +
      "http://www.example.com or &lt;http://www.example.com&gt; and sometimes<br><br>example.com (but not on Github, for example).<br><br>Some text to show that the reference links can follow later.<br><br>" +
      "[arbitrary case-insensitive reference text]: https://www.mozilla.org<br>[1]: http://slashdot.org<br>[link text itself]: http://www.reddit.com",
      displayContent: "<a href=\'https://www.google.com\'>I'm an inline-style link</a><br><br><a href=\'https://www.google.com\' title=\"Google's Homepage\">I'm an inline-style link with title</a><br><br>" +
      "<a href=\'https://www.mozilla.org/en-US/\'>I'm a reference-style link</a><br><br><a href=\'https://github.com/adam-p/markdown-here/blob/master/LICENSE\'>I'm a relative reference to a repository file</a><br><br>" +
      "<a href=\'http://slashdot.org\'>You can use numbers for reference-style link definitions</a><br><br>Or leave it empty and use the <a href=\'http://www.reddit.com\'>link text itself.</a><br><br>" +
      "URLs and URLs in angle brackets will automatically get turned into links. http://www.example.com or http://www.example.com and sometimes example.com (but not on Github, for example).<br><br>Some text to show that the reference links can follow later."},
    { title: "Images",
      cardContent: "Here's our logo (hover to see the title text):<br><br>Inline-style:<br>![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png \"Logo Title Text 1\")<br><br>" +
      " Reference-style:<br>![alt text][logo]<br><br>[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png \'Logo Title Text 2\'",
      displayContent: "Here's our logo (hover to see the title text):<br><br>Inline-style:<img src=\'https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png\' height=\'35\' width=\'35\' title=\'Logo Title Text 1\'/><br><br>" +
      "Reference-style:<img src=\'https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png\' height=\'35\' width=\'35\' title=\'Logo Title Text 2\'/>"},
    { title: "Tables",
      cardContent: "Colons can be used to align columns.<br><br>| Tables        | Are           | Cool  |<br>| ------------- |:-------------:| -----:|<br>| col 3 is      | right-aligned | $1600 |<br>| col 2 is      | centered      |   $12 |<br>" +
      "| zebra stripes | are neat      |    $1 |<br><br>There must be at least 3 dashes separating each header cell.<br>The outer pipes (|) are optional, and you don't need to make the raw Markdown line up prettily. You can also use inline Markdown.<br><br>" +
      "Markdown | Less | Pretty<br>--- | --- | ---<br>*Still* | `renders` | **nicely**<br>1 | 2 | 3",
      displayContent: "Colons can be used to align columns.<br><br><table border=\"1px\"><tr><th>Tables</th><th>Are</th><th>Cool</th></tr><tr><td>col 3 is</td><td>right-aligned</td><td class=\"right\">$1600</td></tr><tr><td>col 2 is</td><td style=\"text-align: center\">centered</td>" +
      "<td class=\"right\">$12</td></tr><tr><td>zebra stripes</td><td>are neat</td><td class=\"right\">$1</td></tr></table><br>There must be at least 3 dashes separating each header cell. The outer pipes (|) are optional, and you don't need to make the raw Markdown line up prettily. You can also use inline Markdown.<br><br>" +
      "<table border=\"1px\"><tr><th>Markdown</th><th>Less</th><th>Pretty</th></tr><tr><td><i>Still</i></td><td>renders</td><td><strong>nicely</strong></td></tr><tr><td>1</td><td>2</td><td>3</td></tr></table>"},
    { title: "Blockquotes",
      cardContent: "> Blockquotes are very handy in email to emulate reply text.<br>> This line is part of the same quote.<br><br>Quote break.<br><br>" +
      "> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote.",
      displayContent: "<blockquote>Blockquotes are very handy in email to emulate reply text.This line is part of the same quote.</blockquote>Quote break.<blockquote>" +
      "This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can <i>put</i> <strong>Markdown</strong> into a blockquote.</blockquote>"},
    { title: "Inline HTML",
      cardContent: "&lt;dl&gt;<br>&nbsp;&nbsp;&nbsp;&lt;dt&gt;Definition list&lt;/dt&gt;<br>&nbsp;&nbsp;&nbsp;&lt;dd&gt;Is something people use sometimes.&lt;/dd&gt;<br><br>&nbsp;&nbsp;&nbsp;&lt;dt&gt;Markdown in HTML&lt;/dt&gt;<br>&nbsp;&nbsp;&nbsp;&lt;dd&gt;Does *not* work **very** well. Use HTML &lt;em&gt;tags&lt;/em&gt;.&lt;/dd&gt;<br>&lt;/dl&gt;",
      displayContent: "<strong><i>Definition list</i></strong><br>&nbsp;&nbsp;&nbsp;Is something people use sometimes.<br><br><strong><i>Markdown in HTML</i></strong><br>&nbsp;&nbsp;&nbsp;Does <i>not</i> work <strong>very</strong> well. Use HTML tags.<br>"},
    { title: "Horizontal Rule",
      cardContent: "Three or more...<br><br>---<br><br>Hyphens<br><br>***<br><br>Asterisks<br><br>___<br><br>Underscores",
      displayContent: "Three or more...<br><br><hr style=\'height: 4px\'><br>Hyphens<br><br><hr style=\'height: 4px\'><br>Asterisks<br><br><hr style=\'height: 4px\'><br>Underscores"},
    { title: "Line Breaks",
      cardContent: "Here's a line for us to start with.<br><br>This line is separated from the one above by two newlines, so it will be a *separate paragraph*.<br><br>This line is also a separate paragraph, but...<br>This line is only separated by a single newline, so it's a separate line in the *same paragraph*.",
      displayContent: "Here's a line for us to start with.<br><br>This line is separated from the one above by two newlines, so it will be a <i>separate paragraph</i>.<br><br>This line is also begins a separate paragraph, but...<br>This line is only separated by a single newline, so it's a separate line in the <i>same paragraph</i>.<br><br>(Technical note: <i>Markdown Here</i> uses GFM line breaks, so there's no need to use MD's two-space line breaks.)"}
    ];

  constructor(public viewCtrl: ViewController) {
  }

  /**
   * To close the modal.
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }

  /**
   * Open/close markdown item.
   * @param group  Index of the group.
   */
  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };

  /**
   * Check group shown status.
   * @param group  Index of the group.
   * @returns  Index of the group shown.
   */
  isGroupShown(group) {
    return this.shownGroup === group;
  };
}
