import React, { useMemo, useState, useEffect } from "react";
import { Button, ConfigProvider, Flex, Popover, Segmented } from "antd";
import { IoFilterSharp } from "react-icons/io5";
import { Radio, Select, Space } from "antd";

const text = <span>Filter Option</span>;
const buttonWidth = 80;

const FilterModal = ({ arrow, setArrow, dataSet, filterByRole, filterByUserType }) => {
  // const [arrow, setArrow] = useState('Show');
  const [size, setSize] = useState("middle");
  const [roleOptions, setRoleOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
    filterByRole(value);
  };
  useEffect(() => {
    const roles = new Set();
    const users = new Set();
    dataSet.forEach((item) => {
      roles.add(item.rollname);
      users.add(item.usertype)
    });

    console.log(roles);
    console.log(users);
    const rolesOptions = Array.from(roles).map((role) => ({
      value: role,
      label: role,
    }));
    setRoleOptions([
      {
        value: "All",
        label: "All",
      },
      ...rolesOptions,
    ]);
    const usersOptions = Array.from(users).map((user) => ({
      value: user,
      label: user,
    }));
    setUserOptions([
      {
        value: "All",
        label: "All",
      },
      ...usersOptions,
    ]);
  }, []);

  // for (let i = 10; i < 36; i++) {
  //   options.push({
  //     value: i.toString(36) + i,
  //     label: i.toString(36) + i,
  //   });
  // }
  const content = (
    <div>
      <div>
        <p className="">User Type</p>
        <Space vertical style={{ width: "100%" }}>
          <Select
            size={size}
            defaultValue="All"
            onChange={filterByUserType}
            style={{ width: 200 }}
            options={userOptions}
          />
        </Space>
      </div>
      <div>
        <p className="">Role Name</p>
        <Space vertical style={{ width: "100%" }}>
          <Select
            size={size}
            defaultValue="All"
            onChange={handleChange}
            style={{ width: 200 }}
            options={roleOptions}
          />
          {/* <Radio.Group value={size} onChange={handleSizeChange}>
          <Radio.Button value="large">Large</Radio.Button>
          <Radio.Button value="middle">Default</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group> */}
        </Space>
      </div>
    </div>
  );

  const mergedArrow = useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }
    if (arrow === "Show") {
      return true;
    }
    return {
      pointAtCenter: true,
    };
  }, [arrow]);
  return (
    <ConfigProvider button={{ style: { width: buttonWidth, margin: 4 } }}>
      {/* <Segmented
        options={['Show', 'Hide', 'Center']}
        onChange={setArrow}
        style={{ marginBottom: 24 }}
      /> */}
      <Flex vertical justify="center" align="center" className="demo">
        <Flex justify="center" align="center" style={{ whiteSpace: "nowrap" }}>
          <Popover
            placement="bottom"
            title={text}
            content={content}
            arrow={mergedArrow}
            trigger="hover"
          >
            <button className="bg-blue-900 text-white px-3 py-1 rounded-full">
              <span className="flex items-center gap-2 justify-center">
                <IoFilterSharp />
                Filter
              </span>
            </button>
          </Popover>
        </Flex>
      </Flex>
    </ConfigProvider>
  );
};
export default FilterModal;

// import React, { useState } from 'react';
// import { Button, Modal } from 'antd';
// const FilterModal = ({open, handleCancel, dataSource}) => {
//   // const showModal = () => {
//   //   setOpen(true);
//   // };
//   const handleOk = e => {
//     console.log(e);
//     console.log(dataSource)
//     // setOpen(false);
//   };
//   // const handleCancel = e => {
//   //   console.log(e);
//   //   setOpen(false);
//   // };
//   return (
//     <>
//       {/* <Button type="primary" onClick={showModal}>
//         Open Modal with customized button props
//       </Button> */}
//       <Modal
//         title="Basic Modal"
//         open={open}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         okButtonProps={handleOk}
//         cancelButtonProps={handleCancel}
//       >
//         <p>Some contents...</p>
//         <p>Some contents...</p>
//         <p>Some contents...</p>
//       </Modal>
//     </>
//   );
// };
// export default FilterModal;
