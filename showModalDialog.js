if (!window.showModalDialog) {
    window.showModalDialog = function(url, arg, opt) {
        url = url || ''; //URL of a dialog
        arg = arg || null; //arguments to a dialog

        var caller = showModalDialog.caller.toString();
        var dialog = document.body.appendChild(document.createElement('dialog'));

        if (dialog.showModal) {
            opt = opt || 'dialogWidth:300px;dialogHeight:200px;z-index: 1000;'; //options: dialogTop;dialogLeft;dialogWidth;dialogHeight or CSS styles
        } else {
            opt = opt + ';position: fixed;top: 1%;overflow: scroll;z-index: 1000;' || 'dialogWidth:300px;dialogHeight:200px;position: fixed;top: 1%;overflow: scroll;z-index: 1000;';
        }

        dialog.setAttribute('style', opt.replace(/dialog/gi, ''));
        dialog.innerHTML = '<a href="#" id="dialog-close" style="position: absolute; top: 0; right: 4px; font-size: 20px; color: #000; text-decoration: none; outline: none;">&times;</a><iframe id="dialog-body" src="' + url + '" style="border: 0; width: 100%; height: 100%;"></iframe>';
        document.getElementById('dialog-body').contentWindow.dialogArguments = arg;
        document.getElementById('dialog-close').addEventListener('click', function(e) {
            e.preventDefault();

            if (dialog.close) {
                dialog.close();
            } else {
            //Remove the open attribute, then clear the contents of the dialog so that additional dialogs can be created and closed            
                dialog.removeAttribute("open");
                dialog.outerHTML = '';
            }
        });

        if (dialog.showModal) {
            dialog.showModal();
        } else {
            dialog.setAttribute("open", "open");
        }

        return new Promise(function(resolve, reject) {
            dialog.addEventListener('close', function() {
                var returnValue = document.getElementById('dialog-body').contentWindow.returnValue;
                document.body.removeChild(dialog);
                resolve(returnValue);
            });
        });
        throw 'showModalDialogShim in use, this may produce unwanted side effects';
    };
}
