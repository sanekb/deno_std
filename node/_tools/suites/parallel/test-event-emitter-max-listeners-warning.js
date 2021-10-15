// deno-fmt-ignore-file
// deno-lint-ignore-file

// Copyright Joyent and Node contributors. All rights reserved. MIT license.
// Taken from Node 16.11.1
// This file is automatically generated by "node/_tools/setup.ts". Do not modify this file manually

// Flags: --no-warnings
// The flag suppresses stderr output but the warning event will still emit
'use strict';

const common = require('../common');
const events = require('events');
const assert = require('assert');

class FakeInput extends events.EventEmitter {
  resume() {}
  pause() {}
  write() {}
  end() {}
}

const e = new FakeInput();
e.setMaxListeners(1);

process.on('warning', common.mustCall((warning) => {
  assert.ok(warning instanceof Error);
  assert.strictEqual(warning.name, 'MaxListenersExceededWarning');
  assert.strictEqual(warning.emitter, e);
  assert.strictEqual(warning.count, 2);
  assert.strictEqual(warning.type, 'event-type');
  assert.ok(warning.message.includes(
    '2 event-type listeners added to [FakeInput].'));
}));

e.on('event-type', () => {});
e.on('event-type', () => {});  // Trigger warning.
e.on('event-type', () => {});  // Verify that warning is emitted only once.
