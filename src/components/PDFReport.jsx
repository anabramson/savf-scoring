import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { dimensionTitles } from './ScoringData';

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10
  },
  text: {
    fontSize: 12,
    marginBottom: 5
  },
  table: {
    display: 'table',
    width: '100%',
    marginBottom: 10
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid'
  },
  tableCol: {
    width: '50%',
    padding: 5
  }
});

// PDF Document Component
const SAVFReport = ({ scores, industry, date }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>SAVF Assessment Report</Text>
        <Text style={styles.text}>Date: {date}</Text>
        <Text style={styles.text}>Industry: {industry}</Text>
        
        {/* Overall Score */}
        <Text style={styles.subtitle}>Overall Score</Text>
        <Text style={styles.text}>
          Total: {Object.values(scores)
            .reduce((sum, score) => sum + score.total, 0)
            .toFixed(1)}/500
        </Text>

        {/* Dimension Scores */}
        <Text style={styles.subtitle}>Dimension Scores</Text>
        {Object.entries(scores).map(([dim, score]) => (
          <View key={dim} style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text>{dimensionTitles[dim]}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{score.total.toFixed(1)}/100</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const PDFReport = ({ scores, industry }) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="mt-4">
      <PDFDownloadLink
        document={<SAVFReport scores={scores} industry={industry} date={currentDate} />}
        fileName={`SAVF-Report-${currentDate}.pdf`}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        {({ blob, url, loading, error }) =>
          loading ? 'Generating PDF...' : 'Download PDF Report'
        }
      </PDFDownloadLink>
    </div>
  );
};

export default PDFReport;