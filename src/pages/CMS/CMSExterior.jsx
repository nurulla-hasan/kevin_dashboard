import { useEffect, useState } from "react";
import {
  Button,
  Tabs,
  Input,
  Switch,
  Card,
  Spin,
  message,
} from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useGetExteriorQuery, useUpdateExteriorMutation } from "../../redux/feature/cms/cmsApi";

const CMSExterior = () => {
  const [activeTab, setActiveTab] = useState("banner");
  const [messageApi, contextHolder] = message.useMessage();

  // Redux hooks
  const { data: exteriorDataFromApi, isLoading: isFetching } = useGetExteriorQuery();
  const [updateExterior, { isLoading: isUpdating }] = useUpdateExteriorMutation();

  const [exteriorData, setExteriorData] = useState({
    banner: {
      title: "An Interior Isn't Just A Space; It's Where Comfort Meets Craftsmanship.",
      isVisible: true,
    },
    projects: {
      title: "Interior Project Near You",
      isVisible: true,
    },
  });

  // Load data from API when available
  useEffect(() => {
    if (exteriorDataFromApi?.sections) {
      setExteriorData(exteriorDataFromApi.sections);
    }
  }, [exteriorDataFromApi]);

  const handleSave = async () => {
    try {
      const payload = {
        data: JSON.stringify({ sections: exteriorData })
      };

      await updateExterior(payload).unwrap();
      messageApi.success("Exterior settings updated successfully!");
    } catch (error) {
      messageApi.error(error?.data?.message || "Failed to update exterior settings");
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6">
      {contextHolder}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Exterior Services Management</h1>
        <p className="text-gray-600">Manage exterior services content and visibility</p>
      </div>

      <Card className="shadow-lg border-none">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: "banner",
              label: "Banner Section",
              children: (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <label className="text-lg font-semibold">Banner Visibility</label>
                    <Switch
                      checked={exteriorData.banner.isVisible}
                      onChange={(checked) => 
                        setExteriorData(prev => ({ 
                          ...prev, 
                          banner: { ...prev.banner, isVisible: checked } 
                        }))
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Banner Title
                    </label>
                    <Input.TextArea
                      value={exteriorData.banner.title}
                      onChange={(e) => 
                        setExteriorData(prev => ({ 
                          ...prev, 
                          banner: { ...prev.banner, title: e.target.value } 
                        }))
                      }
                      rows={3}
                      placeholder="Enter banner title"
                      className="max-w-2xl"
                    />
                  </div>
                </div>
              ),
            },
            {
              key: "projects",
              label: "Projects Section",
              children: (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <label className="text-lg font-semibold">Projects Visibility</label>
                    <Switch
                      checked={exteriorData.projects.isVisible}
                      onChange={(checked) => 
                        setExteriorData(prev => ({ 
                          ...prev, 
                          projects: { ...prev.projects, isVisible: checked } 
                        }))
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Projects Section Title
                    </label>
                    <Input
                      value={exteriorData.projects.title}
                      onChange={(e) => 
                        setExteriorData(prev => ({ 
                          ...prev, 
                          projects: { ...prev.projects, title: e.target.value } 
                        }))
                      }
                      placeholder="Enter projects section title"
                      className="max-w-2xl"
                    />
                  </div>
                </div>
              ),
            },
          ]}
        />

        <div className="mt-8 flex justify-end">
          <Button
            type="primary"
            icon={<SaveOutlined />}
            loading={isUpdating}
            onClick={handleSave}
            className="bg-[#1D69E1] hover:bg-[#164FA9] h-10 px-8 rounded-lg"
          >
            Save Changes
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CMSExterior;