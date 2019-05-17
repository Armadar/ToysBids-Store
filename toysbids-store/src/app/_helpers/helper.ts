export function avoidDragAndDrop(dropzoneId: string) {
    window.addEventListener("dragenter", function (e) {
        document.getElementById(dropzoneId).classList.add('dropzoneHightlight');
        document.getElementById(dropzoneId).classList.add('dropzoneFocus');        
        if ((<HTMLInputElement>e.target).id != dropzoneId) {
            e.preventDefault();
            e.dataTransfer.effectAllowed = "none";
            e.dataTransfer.dropEffect = "none";
        }
    }, false);

    window.addEventListener("dragover", function (e) {
        document.getElementById(dropzoneId).classList.add('dropzoneHightlight');
        document.getElementById(dropzoneId).classList.remove('dropzoneFocus');
        if ((<HTMLInputElement>e.target).id != dropzoneId) {
            e.preventDefault();
            e.dataTransfer.effectAllowed = "none";
            e.dataTransfer.dropEffect = "none";
        }
    });

    window.addEventListener("drop", function (e) {
        if ((<HTMLInputElement>e.target).id != dropzoneId) {
            e.preventDefault();
            e.dataTransfer.effectAllowed = "none";
            e.dataTransfer.dropEffect = "none";
        }
    });

    window.addEventListener("dragexit", function (e) {
        document.getElementById(dropzoneId).classList.remove('dropzoneHightlight');
        document.getElementById(dropzoneId).classList.remove('dropzoneFocus');
    });
}