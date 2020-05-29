import React from 'react';
import { shallow, mount } from 'enzyme';
import { Button } from 'react-bootstrap';

import { CreateAccount } from '../../containers/CreateAccount';
import API from '../../utils/API';

let wrapper, setAuth, history, handleInputChange, handleAccountCreate, event;
jest.mock('../../utils/API');

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('CreateAccount', () => {
  beforeEach(() => {
    setAuth = jest.fn();
    history = { push: jest.fn() }
    handleInputChange = jest.spyOn(CreateAccount.prototype, 'handleInputChange');
    handleAccountCreate = jest.spyOn(CreateAccount.prototype, 'handleAccountCreate');
    event = {
      preventDefault: jest.fn()
    }
    wrapper = shallow(<CreateAccount setAuth={setAuth} history={history} />);
  });

  test('Initial render', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state('isPro')).toBe(false);
  });

  test('Email input updates state', () => {
    expect(wrapper.state('email')).toEqual('');
    wrapper.find({name: 'email'}).simulate('change', {
      target: {
        name: 'email',
        value: 'john@mail.com'
      }
    });
    expect(handleInputChange).toBeCalled();
    expect(wrapper.state('email')).toEqual('john@mail.com');
  });

  test('Password input updates state', () => {
    expect(wrapper.state('password')).toEqual('');
    wrapper.find({name: 'password'}).simulate('change', {
      target: {
        name: 'password',
        value: 'password'
      }
    });

    expect(handleInputChange).toBeCalled();
    expect(wrapper.state('password')).toEqual('password');
  });

  test('First Name input updates state', () => {
    expect(wrapper.state('firstName')).toEqual('');
    wrapper.find({name: 'firstName'}).simulate('change', {
      target: {
        name: 'firstName',
        value: 'John'
      }
    });

    expect(handleInputChange).toBeCalled();
    expect(wrapper.state('firstName')).toEqual('John');
  });

  test('Last Name input updates state', () => {
    expect(wrapper.state('lastName')).toEqual('');
    wrapper.find({name: 'lastName'}).simulate('change', {
      target: {
        name: 'lastName',
        value: 'Smith'
      }
    });

    expect(handleInputChange).toBeCalled();
    expect(wrapper.state('lastName')).toEqual('Smith');
  });

  test('Pro flag is updated', () => {
    expect(wrapper.state('isPro')).toBe(false);
    wrapper.find({value: 'true'}).simulate('change', {
      target: {
        name: 'isPro',
        value: true
      }
    });

    expect(handleInputChange).toBeCalled();
    expect(wrapper.state('isPro')).toEqual(true);
  });

  test('Duplicate email error is displayed', async () => {
    const rejectedValue = {
        response: {data: { message: ['duplicate email']}}
        
      }
    
    API.createAccount.mockRejectedValue(rejectedValue);
    wrapper.instance().handleAccountCreate(event)
    await sleep(500);
    expect(wrapper.state('badCreate')).toBe(true);
    expect(wrapper.state('errorMsg')).toBe('That email address is already in use');
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  test('Other errors displayed', async () => {
    const rejectedValue = {
      response: { data: { message: "error" }}
    }
    API.createAccount.mockRejectedValue(rejectedValue);
    wrapper.instance().handleAccountCreate(event);
    await sleep(500);
    expect(wrapper.state('badCreate')).toBe(true);
    expect(wrapper.state('errorMsg')).toBe('You did something wrong.  Maybe fix that...');
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  test('Successful account creation', async () => {
    const resolvedValue = {
      status: 200,
      data: { user: "someone "}
    }
    wrapper.setState({
      email: 'mail@mail.com',
      password: 'password',
      firstName: 'Jane',
      lastName: 'Smith',
      isPro: true
    });

    API.createAccount.mockResolvedValue(resolvedValue);
    wrapper.instance().handleAccountCreate(event);
    await sleep(500);
    expect(setAuth).toBeCalledWith(true, resolvedValue.data.user);
    expect(history.push).toBeCalledWith('/pro');
    expect(wrapper.state()).toEqual({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      isPro: false,
      badCreate: false,
      errorMsg: ''
    });
  });
});