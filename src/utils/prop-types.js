import PropTypes from 'prop-types';
import { isValidElementType } from 'react-is';

export const categoryPropType = PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
});

export const ingredientFieldPropType = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number
};

export const ingredientPropType = PropTypes.shape(
    ingredientFieldPropType
);

export const routePropType = {
    exact: PropTypes.bool,
    strict: PropTypes.bool,
    location: PropTypes.object,
    sensitive: PropTypes.bool,
    render: PropTypes.func,
    component: (props, propName, componentName) => {
        if (props[propName] && !isValidElementType(props[propName])) {
            return new Error(
                'Проп `' + propName + '` компонента' +
                ' `' + componentName + '` имеет неправильное значение'
            );
        }
    },
    children: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node
    ]),
    path: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(
            PropTypes.string
        )
    ])
};