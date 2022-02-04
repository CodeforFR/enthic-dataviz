import { apiClient } from "../ServerConfiguration";

var APEOntology = null;
var ScoreOntology = null;
var BundleOntology = null;

export default {
  async getAPE() {
    if (APEOntology != null) {
      return APEOntology;
    }
    const url = `/ontology/ape`;
    let results = null;
    try {
      results = await apiClient.get(url);
    } catch (error) {
      console.log("getAPE Error", error);
    }
    APEOntology = results ? results.data : null;
    return APEOntology;
  },
  async getScores() {
    if (ScoreOntology != null) {
      return ScoreOntology;
    }
    const url = `/ontology/scores`;
    let results = null;
    try {
      results = await apiClient.get(url);
    } catch (error) {
      console.log("getScores Error", error);
    }
    ScoreOntology = results ? results.data : null;
    return ScoreOntology;
  },
  async getBundles() {
    if (BundleOntology != null) {
      return BundleOntology;
    }
    const url = `/ontology/bundles`;
    let results = null;
    try {
      results = await apiClient.get(url);
    } catch (error) {
      console.log("getBundles Error", error);
    }
    BundleOntology = results ? results.data : null;
    return BundleOntology;
  },
};
