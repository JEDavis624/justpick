import { Selector } from 'testcafe';
import { app } from '../app.js';
import { User } from '../server/models/User';


fixture`Create Account`
  .page`http://localhost:3000/createaccount`
  .before(async ctx => {
    ctx.server = await app.listen(3000);
  })
  .after(async ctx => {
    await ctx.server.close();
    await User.findOneAndRemove({ email: 'testcafe@mail.com' }).exec((err, doc) => {
      if (err) { return err }
    });
  })

test('General error', async t => {
  await t
    .typeText(Selector('input[type=email]'), 'testcafe@mail')
    .typeText(Selector('input[type=password]'), 'password')
    .typeText(Selector('input[name=firstName'), 'Jane')
    .typeText(Selector('input[name=lastName'), 'Smith')
    .click('button')

    .expect(Selector('.alert-danger').count).eql(1)
    .expect(Selector('.alert-danger').child('p').innerText)
    .eql('You did something wrong. Maybe fix that...');
});

test('Successful Account Creation', async t => {
  debugger;
  await t
    .typeText(Selector('input[type=email]'), 'testcafe@mail.com')
    .typeText(Selector('input[type=password]'), 'password')
    .typeText(Selector('input[name=firstName'), 'Jane')
    .typeText(Selector('input[name=lastName'), 'Smith')
    .click('button')

  const location = await t.eval(() => window.location);

  await t.expect(location.pathname).eql('/pro')
    .expect(Selector('.profileName').innerText).eql('Jane Smith')
});

test('Duplicate Account', async t => {
  await t
    .typeText(Selector('input[type=email]'), 'testcafe@mail.com')
    .typeText(Selector('input[type=password]'), 'password')
    .typeText(Selector('input[name=firstName'), 'Jane')
    .typeText(Selector('input[name=lastName'), 'Smith')
    .click('button')

    .expect(Selector('.alert-danger').count).eql(1)
    .expect(Selector('.alert-danger').child('p').innerText)
    .eql('That email address is already in use');
});  