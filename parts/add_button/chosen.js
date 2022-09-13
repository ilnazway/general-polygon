function init_chosen(is_destroy = false, add_func = null, el = null) {
        add_func != null ? add_func() : '';

        if(el != null){
            el.chosen();
            return;
        }
        $('select').each(function(i) {
            const $select = $(this);
            const selectId = $select.attr('id') ? $select.attr('id') : '';

            if(is_destroy){
                $select.chosen("destroy");
            }

            setTimeout(() => {
                if(!$select.hasClass('combobox') && // поля типа Связь
                    !$select.hasClass('dont_use_chosen') && // явный запрет использовать chosen
                    !$select.hasClass('fields__fast-edit--combobox') &&
                    !$select.hasClass('combobox--hidden') &&
                    !$select.hasClass('select_tpl') &&  // выбор шаблона вычисления
                    !$select.hasClass('conditions_select') && // условия для запуска в шаблонах
                    !$select.hasClass('cons_cond') && // условие в вычислении
                    !$select.hasClass('cons_union') && // select "и/или" для условий в вычислении
                    selectId.indexOf('cond_union') < 0 && // select "и/или" для условий в информерах
                    selectId.indexOf('cond_term') < 0) {
                    let sel = $select;
                    let selected = sel.val(); // cache selected value, before reordering
                    let opts_group_list = sel.children('optgroup');
                    let opts_list = sel.children('option');

                    opts_group_list.each(function(i, elem) {
                        opts_list_in_group = $(elem).children('option');
                        opts_list_in_group.sort(function(a, b) { return $(a).text() > $(b).text() ? 1 : -1; });
                        $(elem).html('').append(opts_list_in_group);
                    });
                    opts_group_list.sort(function(a, b) { return $(a).text() > $(b).text() ? 1 : -1; });
                    opts_list.sort(function(a, b) { return $(a).text() > $(b).text() ? 1 : -1; });
                    sel.html('').append(opts_list).append(opts_group_list);
                    sel.val(selected);

                    const defaultWidth = $select.hasClass('strict-mode-select') || $select.hasClass('sync-mode-select') ? '100%' : $select.outerWidth() - 2;
                    const chosenParams = { width : defaultWidth, search_contains : true }; // Для инициализации временно скрытых select-ов
                    $select.chosen(chosenParams);
                    //if ($select.siblings('.chosen-container').length > 1) $select.siblings('.chosen-container:eq(1)').remove();

                    setTimeout(function() {
                        $($select).trigger("chosen:updated");
                    }, 1);

                    const chosenLink = $select.siblings('.chosen-container').find('a.chosen-single');
                    //chosenLink.off('click', setChosenSelectOptionsDisplay());
                    //chosenLink.on('click', setChosenSelectOptionsDisplay($select));
                }
            }, 0);
        });
    }