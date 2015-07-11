(function ($) {
    // All your code here
    Drupal.behaviors.eshop_card = {
        attach: function (context) {
            //adjust elements for natinal bundles
            jQuery('#tabs').tabs();
            jQuery('div.attribute-4, div.attribute-5').hide();
            jQuery('table.nat-bundle td:not(.package, .disabled)').click(function () {
                jQuery(this).toggleClass('selected-cell').siblings().removeClass('selected-cell');

                var package_id = jQuery(this).attr('package-id');
                var group = jQuery(this).parent().attr('group');

                if (jQuery(this).hasClass('selected-cell')) {
                    jQuery("input[name=" + group + "][value=" + package_id + "]").prop('checked', true);
                }
                else {
                    jQuery("input[name=" + group + "][value=" + package_id + "]").prop('checked', false);
                }
                updateSummary();
            });
        }
    }
    updateSummary();
})(jQuery);



function updateSummary() {
  if (jQuery('table.nat-bundle').length == 0) {
    return;
  }

  // Update packages in description text under the table.
  jQuery('.nat-bundle-desc .voice').text(jQuery('table.nat-bundle .voice .selected-cell .size').text());
  jQuery('.nat-bundle-desc .sms').text(jQuery('table.nat-bundle .sms .selected-cell .size').text());
  jQuery('.nat-bundle-desc .data').text(jQuery('table.nat-bundle .data .selected-cell .size').text());

  // Add zero to unselected packages to make sure they still look nice. this is only
  // for looks, has no functionality impact.
  jQuery('.nat-bundle-desc .voice, .nat-bundle-desc .sms, .nat-bundle-desc .data').each(function() {
    if (jQuery(this).text() == "") {
      jQuery(this).text("0");
    }
  });

  // Update the total cost.
  var sum = 0;
  jQuery('table.nat-bundle .selected-cell .price').each(function () {
    sum += Number(jQuery(this).text());
  });

  jQuery('.nat-bundle-desc .total').text(sum);


  // Disable order now button if nothing is selected.
  if (jQuery('table.nat-bundle td.selected-cell').length > 0) {
    jQuery('#edit-attributes-4').val(jQuery('.nat-bundle-desc').text());
  }
  else {
    jQuery('#edit-attributes-4').val('');
  }
}

function _assign_international_bundle() {
    if (jQuery(".form-item-int-bundle input[name=int-bundle]:checked").val()) {
        var price =  jQuery(".form-item-int-bundle input[name=int-bundle]:checked").parents('tr').find('td.price').html();
        var size =  jQuery(".form-item-int-bundle input[name=int-bundle]:checked").parents('tr').find('td.size').html();
        var country_id = jQuery('#edit-int-region :selected').val();
        var country_name = jQuery('#edit-int-region :selected').text();
        jQuery('.internat-bundle-desc span[data-id='+ country_id +']').remove();
        var html = '<span data-id="'+ country_id +'">'+ country_name +'('+ size +') - "'+ price +'"</span>';
        if (jQuery('.internat-bundle-desc').html()) {
            jQuery('.internat-bundle-desc').append(', ' + html);
        }
        else {
            jQuery('.internat-bundle-desc').html(html);
        }
        jQuery('#edit-attributes-5').val(jQuery('.internat-bundle-desc').text());
        //alert(Drupal.t('Your package was added successfully'));
    }
    else {
        alert(Drupal.t('You should select one package'));
    }
}