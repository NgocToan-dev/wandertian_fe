import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseInput from './BaseInput.vue';

describe('BaseInput', () => {
    it('renders correctly', () => {
      const wrapper = mount(BaseInput);
      expect(wrapper.text()).toContain('Hello World'); // Assert on rendered content
    });
});