import { createLocalVue } from "%utils";
import { shallowMount } from "@vue/test-utils";

import { i18n } from "@/i18n";
import store from "@/store";
import router from "@/router";
import UserMenu from "@/components/ui/UserMenu";

const mockLocalVue = createLocalVue();
jest.doMock("vue", () => ({ default: mockLocalVue }));

describe.skip("The UserMenu component", () => {
  test("logout", async function() {
    jest.spyOn(mockLocalVue.auth, "logout").mockImplementation(jest.noop);

    const target = shallowMount(UserMenu, {
      localVue: mockLocalVue,
      store,
      router,
      i18n
    });

    await target.vm.logout();
    expect(mockLocalVue.auth.logout).toHaveBeenCalled();
  });
});
