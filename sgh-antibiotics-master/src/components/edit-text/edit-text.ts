import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AlertController, ModalController } from 'ionic-angular';
import { MarkdownModalInfoPage } from '../../pages/markdown-modal-info/markdown-modal-info';
import * as showdown from 'showdown';
import { Converter } from 'showdown';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';

/**
 * Settings for the EditTextComponent.
 */
export class EditTextSettings {
  /**
   * Display a reset button.
   * @type {boolean}
   */
  showResetButton = true;
  /**
   * Display a save button.
   * @type {boolean}
   */
  showSaveButton = true;
  /**
   * Display shortcuts.
   * @type {boolean}
   */
  showShortcuts = true;
  /**
   * Display info.
   * @type {boolean}
   */
  showInfo = true;
  /**
   * Time set.
   * @type {number}
   */
  debounceTime = 500;
}

/**
 * Reusable Text Editor for Markdown.
 * Can be used with 'Save' and 'Reset' Buttons or can produce debounced events, when the
 * User finished changing some text.
 */
@Component({
  selector: 'edit-text',
  templateUrl: 'edit-text.html'
})
export class EditTextComponent {

  readonly header = "# <insert header 1 here> \n" + "## <insert header 2 here> \n";
  readonly list = "1. <insert first ordered list item> \n" + "2. <insert another item> \n" +
    "  - <insert unordered sub-list item; To include sub-list item, you will need to use two trailing spaces.> \n"
    + "3. <insert another item> \n\n\n"
    + "- <insert first unordered list item> \n" + "+ <insert another item> \n" + "* <insert another item> \n";
  readonly link = "[Google](https://www.google.com) \n";
  readonly image  = "Image: ![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png \"Logo Title Text 1\") \n";
  readonly table = "Markdown | Less | Pretty\n" + "=== | === | ===\n" + "*Still* | `renders` | **nicely**\n" + "1 | 2 | 3";
  readonly blockquote = "> <insert line 1 here>\n" + "> <insert line 2 here>\n" + "> <insert line 3 here>";
  readonly inlineHtml = "<dl>\n" + "  <dt>Definition list</dt>\n" + "  <dd>Is something people use sometimes.</dd>\n" +
    "\n" + "  <dt>Markdown in HTML</dt>\n" + "  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>\n" +
    "</dl>";
  readonly horizontalRule = "\n --- \n";
  readonly linebreak = "\n\n";

  @Input() editMode: boolean;
  _editTextSettings: EditTextSettings = new EditTextSettings();
  _editText: string;

  @Output() saveClicked = new EventEmitter();

  @Output() textChange = new EventEmitter();
  @Output() debouncedTextChange = new EventEmitter();

  content: string = '';
  _text = '';
  caretPos: number = 0;
  contentChanged: boolean;

  converter: Converter;

  _input: ElementRef;

  constructor(private alertCtrl: AlertController, public modalCtrl: ModalController) {
    this.converter = new showdown.Converter({tables: true, ghCompatibleHeaderId: true});
    this.text = this.editText;
  }

  /**
   * Retrieve the current reference of this component.
   * @returns {ElementRef}  current reference.
   */
  get input(): ElementRef{
    return this._input;
  }

  /**
   * Setting new reference for this component.
   * @param {ElementRef} reference  new reference.
   */
  @ViewChild('textInput')
  set input(reference: ElementRef) {
    if (reference != null) {
      this._input = reference;
      const debounce = Observable.fromEvent(this.input.nativeElement, 'input').map((i: {currentTarget: {value: any}}) => i.currentTarget.value);
      const debouncedInput = debounce.debounceTime(this.editTextSettings.debounceTime);
      debouncedInput.subscribe(val => {
        this.debouncedTextChange.emit(val)
      });
    }
  }

  /**
   * Retrieve the current settings of this component.
   * @returns {EditTextSettings}  current settings.
   */
  get editTextSettings(): EditTextSettings {
    return this._editTextSettings;
  }

  /**
   * Activate new setting for this component.
   * @param {EditTextSettings} settings  new settings
   */
  @Input()
  set editTextSettings(settings: EditTextSettings) {
    this._editTextSettings = settings;
  }

  /**
   * Retrieve the current string of this component.
   * @returns {string}  current string.
   */
  get editText(): string {
    return this._editText;
  }

  /**
   * Setting new string for this component.
   * @param {string} value  new string.
   */
  @Input()
  set editText(value: string) {
    this._editText = value;
    this.text = value;
  }

  /**
   * Retrieve the current string of this component.
   * @returns {string}  current string.
   */
  get text(): string {
    return this._text;
  }

  /**
   * Setting new string for this component.
   * @param {string} value  new string.
   */
  set text(value: string) {
    this._text = value;
    this.content = this.converter.makeHtml(this._text);
    this.contentChanged = this.text !== this.editText;
    this.textChange.emit(value);
  }

  /**
   * Get cursor position from textarea.
   * @param oField
   */
  getCaretPos(oField) {
    if (oField.selectionStart || oField.selectionStart == '0') {
      this.caretPos = oField.selectionStart;
    }
  }

  /**
   * Reset content changed.
   */
  reset() {
    this.text = this.editText;
  }

  /**
   * Emit content changed.
   */
  save() {
    this.saveClicked.emit(this.text);
  }

  /**
   * To insert markdown sample.
   * @param {string} markdown
   */
  insertMarkdown(markdown: string) {
    this.text = [this.text.slice(0, this.caretPos), markdown, this.text.slice(this.caretPos)].join('');
  }

  /**
   * Alert for reset button.
   */
  presentResetAlert() {
    let alert = this.alertCtrl.create({
      title: 'Discard Changes',
      message: 'Are you sure you want to discard all unsaved changes?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Discard',
          handler: () => {
            this.reset();
          }
        }
      ]
    });
    alert.present();
  }

  /**
   * Create modal for markdown info.
   */
  showInfo(){
    let infoModal = this.modalCtrl.create(MarkdownModalInfoPage);
    infoModal.present();
  }

}
