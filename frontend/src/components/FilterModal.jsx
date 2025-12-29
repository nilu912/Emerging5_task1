import React, { useMemo, useState, useEffect } from "react";
import { Button, ConfigProvider, Flex, Popover, Segmented } from "antd";
import { IoFilterSharp } from "react-icons/io5";
import { Radio, Select, Space } from "antd";

const text = <span>Filter Option</span>;
const buttonWidth = 80;

const FilterModal = ({ arrow, setArrow, dataSet, filterValues }) => {
  // const [arrow, setArrow] = useState('Show');
  const [size, setSize] = useState("middle");
  const [roleOptions, setRoleOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [values, setValues] = useState({
    role: "All",
    type: "All",
  });
  useEffect(() => {
    const roles = new Set();
    const users = new Set();
    dataSet.forEach((item) => {
      roles.add(item.rollname);
      users.add(item.usertype);
    });

    // console.log(roles);
    // console.log(users);
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
  const resetBtnHandler = () => {
    const newValues = {
      role: "All",
      type: "All",
    };
    setValues(newValues);
    filterValues(newValues);
  };
  const content = (
    <div className="border-t-2 pt-2 border-gray-300 flex flex-col gap-2">
      <div className="flex gap-1 flex-col">
        <p>User Type</p>
        <Space vertical style={{ width: "100%" }}>
          <Select
            size={size}
            defaultValue={values.type}
            value={values.type}
            onChange={(value) =>
              setValues((prev) => ({ ...prev, type: value }))
            }
            style={{ width: 200 }}
            options={userOptions}
          />
        </Space>
      </div>
      <div className="flex gap-1 flex-col">
        <p>Role Name</p>
        <Space vertical style={{ width: "100%" }}>
          <Select
            size={size}
            defaultValue={values.role}
            value={values.role}
            onChange={(value) =>
              setValues((prev) => ({ ...prev, role: value }))
            }
            style={{ width: 200 }}
            options={roleOptions}
          />
        </Space>
      </div>
      <div className="flex gap-1 flex-row justify-end">
        <button
          className="px-5 py-1 border border-blue-800 rounded"
          onClick={() => resetBtnHandler()}
        >
          Reset
        </button>
        <button
          className="px-5 py-1 border bg-blue-800 text-white rounded"
          onClick={() => filterValues(values)}
        >
          Ok
        </button>
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
            trigger="click"
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
