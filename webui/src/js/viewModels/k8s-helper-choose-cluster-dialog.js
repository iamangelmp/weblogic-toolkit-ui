/**
 * @license
 * Copyright (c) 2023, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0 as shown at https://oss.oracle.com/licenses/upl/
 */
'use strict';

define(['accUtils', 'knockout', 'utils/i18n', 'utils/observable-properties', 'utils/validation-helper',
  'ojs/ojarraydataprovider', 'utils/wkt-logger', 'ojs/ojselectcombobox', 'ojs/ojinputtext', 'ojs/ojlabel',
  'ojs/ojbutton', 'ojs/ojdialog', 'ojs/ojformlayout', 'ojs/ojvalidationgroup'],
function(accUtils, ko, i18n, props, validationHelper, ArrayDataProvider) {
  function KubernetesHelperChooseClusterDialogModel(args) {
    const DIALOG_SELECTOR = '#k8sHelperChooseClusterDialog';

    this.i18n = i18n;
    this.testClusterNames = args.availableClusters;
    this.selectedTestClusterName = ko.observable();
    this.testClusterNamesDP =
      new ArrayDataProvider(this.testClusterNames, { keyAttributes: 'name' });

    this.connected = () => {
      accUtils.announce('Choose Verrazzano application status choose cluster dialog loaded.', 'assertive');
      // open the dialog after the current thread, which is loading this view model.
      // using oj-dialog initial-visibility="show" causes vertical centering issues.
      setTimeout(function() {
        $(DIALOG_SELECTOR)[0].open();
      }, 1);
    };

    this.labelMapper = (labelId) => {
      return i18n.t(`kubectl-helper-choose-cluster-${labelId}`);
    };

    this.okInput = () => {
      $(DIALOG_SELECTOR)[0].close();

      const result = {};
      result.clusterName = this.selectedTestClusterName();
      args.setValue(result);
    };

    this.cancelInput = () => {
      $(DIALOG_SELECTOR)[0].close();
      args.setValue();
    };
  }

  /*
   * Returns a constructor for the ViewModel.
   */
  return KubernetesHelperChooseClusterDialogModel;
});
