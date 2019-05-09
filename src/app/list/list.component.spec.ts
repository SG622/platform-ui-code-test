import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let store = {};
  const sessionStorageStub = {
    store: {},
    getItem: (key: string): string => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
      store[key] = `${value}`;
    }
  };

  beforeEach(() => {
    component = new ListComponent();
    component.storage = {
      store: {},
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string): void => {
        store[key] = `${value}`;
      }
    };
    spyOn(component.storage, 'getItem').and.callFake(sessionStorageStub.getItem);
    spyOn(component.storage, 'setItem').and.callFake(sessionStorageStub.setItem);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('unselected providers', () => {
    it('should have an initial length of 3', () => {
      expect(component.unselectedProviders.length).toEqual(3);
    });

    it('should have an id', () => {
      expect(component.unselectedProviders[0].id).toEqual('1');
    });

    it('should have a name', () => {
      expect(component.unselectedProviders[0].name).toEqual('John');
    });

    it('should have an address', () => {
      expect(component.unselectedProviders[0].address).toEqual('123 Greenway Blvd');
    });

    it('should have a phone', () => {
      expect(component.unselectedProviders[0].phone).toEqual('8991234321');
    });
  });

  describe('selected providers', () => {
    it('should have no initial length', () => {
      expect(component.selectedProviders.length).toEqual(0);
    });
  });

  describe('select and remove providers', () => {
    it('should add a provider to the selected providers list', () => {
      spyOn(component, 'storeStorage');
      component.selectProvider(component.unselectedProviders[0], 0);
      expect(component.selectedProviders.length).toEqual(1);
      expect(component.unselectedProviders.length).toEqual(2);
      expect(component.storeStorage).toHaveBeenCalled();
    });
    it('should remove a provider from the selected list to the unselected providers list', () => {
      spyOn(component, 'storeStorage');
      component.selectedProviders = component.unselectedProviders;
      component.unselectedProviders = [];
      component.removeProvider(component.selectedProviders[0], 0);
      expect(component.unselectedProviders.length).toEqual(1);
      expect(component.selectedProviders.length).toEqual(2);
      expect(component.storeStorage).toHaveBeenCalled();
    });
  });

  it('should test the storeStorage method by checking existence', () => {
    component.selectProvider(component.unselectedProviders[0], 0);
    component.storeStorage();
    expect(component.storage.setItem).toHaveBeenCalled();
    expect(component.storage.getItem('selected')).toBeDefined();
    expect(component.storage.getItem('unselected')).toBeDefined();
  });
});
