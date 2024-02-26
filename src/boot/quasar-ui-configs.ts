import { QInput, QSelect } from 'quasar';

const defaultProps = {
  QInput: {
    component: QInput,
    defaults: {
      outlined: true
    }
  },
  QSelect:{
    component: QSelect,
    defaults:{
      outlined:true,
      emitValue:true,
      mapOptions:true
    }
  }
};

Object.values(defaultProps).forEach(item => {
  Object.entries(item.defaults).forEach(([name, value]) => {
    item.component.props[name] = {
      ...item.component.props[name],
      default: value
    };
  });
});

