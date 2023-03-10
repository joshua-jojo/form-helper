import axios from "axios";
import { reactive } from '@vue/reactivity'

function useForm(dataObject: object) {
  const dataDefault = dataObject;
  let mainObject: any = reactive(setState(dataDefault));

  function setState(data: object) {
    return {
      ...data,
      errors: {},
      message: null,
      processing: false,
      progress: {
        percentage: 0,
        size: 0,
      },
      reset: reset,
      get: submitGet,
      post: submitPost,
      put: submitPut,
      delete: submitDelete,
    };
  }

  async function reset() {
    await Object.keys(dataDefault).forEach((key) => {
      mainObject[key] = null;
    });
    mainObject["errors"] = {};
    mainObject["message"] = null;
  }
  async function getData() {
    let data: any = {};
    await Object.keys(dataDefault).forEach((key) => {
      data[key] = mainObject[key];
    });
    return data;
  }

  function optionRun(response: any, option: any) {
    if (response.data.status == "success") {
      option?.onSuccess(response.data);
    } else if (response.data.status == "error") {
      mainObject.errors = {}
      Object.keys(response.data?.errors).forEach((key) => {
        mainObject.errors[key] = response.data.errors[key]
      })
      option.onError ? option.onError() : false;
    }
  }

  async function submitGet(url: string, option: any) {
    mainObject.processing = true;
    const data = await getData();
    await axios({
      method: "get",
      url: url,
      params: data,
    }).then(async (response) => {
      mainObject.processing = false;
      await optionRun(response, option);
    });
    mainObject.processing = false;
  }

  async function submitPost(url: string, option: any) {
    mainObject.processing = true;
    const data = await getData();
    await axios({
      headers: {
        "Content-Type": 'multipart/form-data'
      },
      method: "post",
      url: `${url}`,
      data: data,
      onUploadProgress: (detail: any) => {
        mainObject.progress.percentage = Math.round(detail.progress * 100)
        const loaded = (detail.loaded / 1024 / 1000).toFixed(2)
        const totalUpload = (detail.total / 1024 / 1000).toFixed(2)
        mainObject.progress.size = `${loaded} MB / ${totalUpload} MB`
      }
    }).then(async (response) => {
      mainObject.processing = false;
      await optionRun(response, option);
    });
    mainObject.progress.percentage = 0
    mainObject.progress.size = 0
    mainObject.processing = false;
  }

  async function submitPut(url: string, option: any) {
    mainObject.processing = true;
    const data = await getData();
    await axios({
      method: "put",
      url: url,
      params: data,
      onUploadProgress: (detail: any) => {
        mainObject.progress.percentage = Math.round(detail.progress * 100)
        const loaded = (detail.loaded / 1024 / 1000).toFixed(2)
        const totalUpload = (detail.total / 1024 / 1000).toFixed(2)
        mainObject.progress.size = `${loaded} MB / ${totalUpload} MB`
      }
    }).then(async (response) => {
      mainObject.processing = false;
      await optionRun(response, option);
    });
    mainObject.progress.percentage = 0
    mainObject.progress.size = 0
    mainObject.processing = false;
  }

  async function submitDelete(url: string, option: any) {
    mainObject.processing = true;
    const data = await getData();

    await axios({
      method: "delete",
      url: url,
      params: data,
    }).then(async (response) => {
      mainObject.processing = false;
      await optionRun(response, option);
    });
    mainObject.processing = false;
  }

  return reactive(mainObject);
}
export default useForm;
