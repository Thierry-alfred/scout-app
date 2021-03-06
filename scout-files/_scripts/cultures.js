
/*
  Localization, Internationalization, language files.
  Set the correct language. Read the language file.
  Update scout.dictionary. Update the UI.
*/

(function () {

    var $ = window.$;
    var scout = window.scout;
    var ugui = window.ugui;

    /**
     * This is the basic KEY to Definition function for languages.
     *
     * @param  {string}  phrase         The KEYWORD for the dictionary to match
     * @param  {boolean} wrapInDataLang If false, we don't wrap the string in a data-lang span
     * @return {string}                 The translated text.
     */
    function localize (phrase, wrapInDataLang) {
        wrapInDataLang = wrapInDataLang || false;
        if (!phrase) {
            return 'No translation found.';
        }
        var translation = window.dictionary[phrase];

        if (wrapInDataLang) {
            return '<span data-lang="' + phrase + '">' + translation + '</span>';
        } else {
            return translation;
        }
    }

    /**
     * There are HTML elements that include a data-lang="KEYWORD" attribute.
     * This function updates them with the matching translation to their KEYWORD.
     */
    function updateDataLangs () {
        //data-lang
        var i = 0;
        var langKey = '';
        var items = $('*[data-lang]');
        for (i = 0; i < items.length; i++) {
            var item = items[i];
            langKey = $(item).data('lang');
            $(item).html(localize(langKey));
        }
        //data-langalt
        var altItems = $('*[data-langalt]');
        for (i = 0; i < altItems.length; i++) {
            var altItem = altItems[i];
            langKey = $(altItem).data('langalt');
            $(altItem).attr('alt', localize(langKey));
        }
        //data-langtitle
        var titleItems = $('*[data-langtitle]');
        for (i = 0; i < titleItems.length; i++) {
            var titleItem = titleItems[i];
            langKey = $(titleItem).data('langtitle');
            $(titleItem).attr('title', localize(langKey));
        }
        //data-langarialabel
        var ariaLabelItems = $('*[data-langarialabel]');
        for (i = 0; i < ariaLabelItems.length; i++) {
            var ariaLabelItem = ariaLabelItems[i];
            langKey = $(ariaLabelItem).data('langarialabel');
            $(ariaLabelItem).attr('aria-label', localize(langKey));
        }
        //data-langhref
        var hrefItems = $('*[data-langhref');
        for (i = 0; i < hrefItems.length; i++) {
            var hrefItem = hrefItems[i];
            langKey = $(hrefItem).data('langhref');
            $(hrefItem).attr('href', localize(langKey));
        }
        //Allow links with a class of "external-link" to open in the user's default browser
        ugui.helpers.openDefaultBrowser();
        $('.nodeSassVersion').html('(Node-Sass v' + scout.versions.nodeSass +  ' / LibSass v' + scout.versions.libSass + ')');
        $('.chokidarVersion').html('v' + scout.versions.chokidar);
    }

    /**
     * Allow users to update the language of the app to match their locale.
     * @param {sting} userLanguage  Should match a .json file in the cultures folder.
     */
    function setLanguage (userLanguage) {
        userLanguage = userLanguage || 'en';
        scout.globalSettings.cultureCode = userLanguage;
        var dictionary = ugui.helpers.readAFile('scout-files/cultures/' + userLanguage + '.json');
        dictionary = JSON.parse(dictionary);
        window.dictionary = dictionary;
        if (scout.helpers.saveSettings) {
            scout.helpers.saveSettings();
        }
        updateDataLangs();
        $('#culture-pics').attr('src', 'cultures/' + userLanguage + '.jpg');
    }

    //This will be overridden by the user's saved settings later,
    //but if they don't have saved settings, we default to English.
    setLanguage('en');
    updateDataLangs();
    window.scout.helpers.setLanguage = setLanguage;
    window.scout.helpers.updateDataLangs = updateDataLangs;
    window.scout.localize = localize;

})();
