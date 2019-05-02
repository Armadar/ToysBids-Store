import { Directive, ElementRef, Input, SimpleChanges } from '@angular/core';

@Directive({ selector: 'img[imgPreview]' })

export class ImagePreview {

    @Input() image: any;

    constructor(private el: ElementRef) { }

    ngOnChanges(changes: SimpleChanges) {

        let reader = new FileReader();
        let el = this.el;

        reader.onloadend = function (e) {
            el.nativeElement.src = reader.result;
        };

        if (this.image) {
            return reader.readAsDataURL(this.image);
        }

    }
}