import React from 'react';
import { Drawer } from '../../ui/Drawer';
import { FilterSidebar, FilterSidebarProps } from './FilterSidebar';
import { Button } from '../../ui/Button';

export interface FilterDrawerProps extends FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  ...props
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Filter Equipment"
      subtitle="Refine Rental Selections"
      footer={
        <Button variant="primary" fullWidth onClick={onClose}>
          Show {props.totalProducts} Results
        </Button>
      }
    >
      <FilterSidebar {...props} />
    </Drawer>
  );
};
