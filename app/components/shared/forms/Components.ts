import Vue from 'vue';
import * as Components from './index';
import * as obs from 'services/obs-api';
import { TSubPropertyType, ECustomTypes } from './Input';
import Component from 'vue-class-component';

function componentFromInt(subType: TSubPropertyType): typeof Vue {
  switch (subType) {
    case obs.ENumberType.Scroller:
      return Components.IntInput;
    case obs.ENumberType.Slider:
      return Components.SliderInput;
  }

  return Components.IntInput;
}

function componentFromFloat(subType: TSubPropertyType): typeof Vue {
  switch (subType) {
    case obs.ENumberType.Scroller:
      return Components.NumberInput;
    case obs.ENumberType.Slider:
      return Components.SliderInput;
  }

  return Components.NumberInput;
}

function componentFromList(subType: TSubPropertyType): typeof Vue {
  return Components.ListInput;
}

function componentFromEditableList(subType: TSubPropertyType): typeof Vue {
  switch (subType) {
    case obs.EEditableListType.Files:
    case obs.EEditableListType.FilesAndUrls:
    case obs.EEditableListType.Strings:
      /* We don't have specialized components for these */
      break;
  }

  return Components.EditableListInput;
}

function componentFromPath(subType: TSubPropertyType): typeof Vue {
  switch (subType) {
    case obs.EPathType.Directory:
    case obs.EPathType.File:
    case obs.EPathType.FileSave:
      /* We don't have specialized components for these */
      break;
  }

  return Components.PathInput;
}

function componentFromText(subType: TSubPropertyType): typeof Vue {
  switch (subType) {
    case obs.ETextType.Default:
    case obs.ETextType.Multiline:
    case obs.ETextType.Password:
      /* We really need specialization for these... */
      break;
  }

  return Components.TextInput;
}

function getStringFromType(type: obs.EPropertyType | ECustomTypes): string {
  switch (type) {
    case obs.EPropertyType.Boolean:
      return 'Boolean';
    case obs.EPropertyType.Button:
      return 'Button';
    case obs.EPropertyType.Color:
      return 'Color';
    case obs.EPropertyType.EditableList:
      return 'EditableList';
    case obs.EPropertyType.Float:
      return 'Float';
    case obs.EPropertyType.Font:
      return 'Font';
    case obs.EPropertyType.FrameRate:
      return 'FrameRate';
    case obs.EPropertyType.Int:
      return 'Int';
    case obs.EPropertyType.Invalid:
      return 'Invalid';
    case obs.EPropertyType.List:
      return 'List';
    case obs.EPropertyType.Path:
      return 'Path';
    case obs.EPropertyType.Text:
      return 'Text';
  }
}

export function propertyComponentForType(
type: obs.EPropertyType | ECustomTypes, subType?: TSubPropertyType): typeof Vue {
  switch (type) {
    case obs.EPropertyType.Boolean:
      return Components.BoolInput;
    case obs.EPropertyType.Button:
      return Components.ButtonInput;
    case obs.EPropertyType.Color:
      return Components.ColorInput;
    case obs.EPropertyType.EditableList:
      return componentFromEditableList(subType);
    case obs.EPropertyType.Float:
      return componentFromFloat(subType);
    case obs.EPropertyType.Font:
      return Components.FontInput;
    case obs.EPropertyType.FrameRate:
      console.warn('There is no frame rate component!');
      break;
    case obs.EPropertyType.Int:
      return componentFromInt(subType);
    case obs.EPropertyType.Invalid:
      console.warn('This should technically never happen!');
      break;
    case obs.EPropertyType.List:
      return componentFromList(subType);
    case obs.EPropertyType.Path:
      return componentFromPath(subType);
    case obs.EPropertyType.Text:
      return componentFromText(subType);
    case ECustomTypes.ResolutionInput:
      return Components.ResolutionInput;
  }

  console.warn(`Component for property type #${type} not found!`);
  return null;
}
